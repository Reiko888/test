import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { banStateSchema, type WSMessage, type BanState } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // WebSocket server for real-time ban updates
  const wss = new WebSocketServer({ server: httpServer, path: '/ws' });

  // Broadcast to all connected clients
  function broadcast(message: WSMessage) {
    const messageStr = JSON.stringify(message);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(messageStr);
      }
    });
  }

  wss.on('connection', async (ws) => {
    console.log('Client connected to WebSocket');

    // Send current ban state to newly connected client
    const currentState = await storage.getBanState();
    ws.send(JSON.stringify({ type: 'ban_update', data: currentState }));

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString()) as WSMessage;

        if (message.type === 'ban_update') {
          // Validate the ban state schema
          const validationResult = banStateSchema.safeParse(message.data);
          if (!validationResult.success) {
            console.error('Invalid ban state received:', validationResult.error);
            ws.send(JSON.stringify({ 
              type: 'error', 
              message: 'Invalid ban state format' 
            }));
            return;
          }

          await storage.updateBanState(validationResult.data);
          broadcast(message);
        } else if (message.type === 'reset_all') {
          const emptyState = await storage.resetBanState();
          broadcast({ type: 'ban_update', data: emptyState });
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
        ws.send(JSON.stringify({ 
          type: 'error', 
          message: 'Failed to process message' 
        }));
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected from WebSocket');
    });
  });

  // HTTP API endpoints
  app.get('/api/ban-state', async (req, res) => {
    const banState = await storage.getBanState();
    res.json(banState);
  });

  app.post('/api/ban-state', async (req, res) => {
    try {
      const validationResult = banStateSchema.safeParse(req.body);
      if (!validationResult.success) {
        return res.status(400).json({ error: 'Invalid ban state format' });
      }

      const banState = validationResult.data;
      await storage.updateBanState(banState);
      broadcast({ type: 'ban_update', data: banState });
      res.json(banState);
    } catch (error) {
      console.error('Error updating ban state:', error);
      res.status(500).json({ error: 'Failed to update ban state' });
    }
  });

  app.post('/api/reset-bans', async (req, res) => {
    try {
      const emptyState = await storage.resetBanState();
      broadcast({ type: 'ban_update', data: emptyState });
      res.json(emptyState);
    } catch (error) {
      console.error('Error resetting bans:', error);
      res.status(500).json({ error: 'Failed to reset bans' });
    }
  });

  return httpServer;
}
