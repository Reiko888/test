import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import type { WSMessage, BanState } from '@shared/schema';

interface WebSocketContextType {
  banState: BanState;
  isConnected: boolean;
  sendBanUpdate: (newState: BanState) => boolean;
  resetAll: () => boolean;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export function WebSocketProvider({ children }: { children: ReactNode }) {
  const [banState, setBanState] = useState<BanState>({
    killerPerks: [],
    survivorPerks: [],
    maps: [],
    killers: []
  });
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isMountedRef = useRef(true);

  const connect = () => {
    // Don't attempt to connect if unmounted
    if (!isMountedRef.current) return;

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
      reconnectAttemptsRef.current = 0;
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data) as WSMessage;
        if (message.type === 'ban_update') {
          setBanState(message.data);
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    socket.onclose = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
      
      // Only attempt to reconnect if still mounted
      if (!isMountedRef.current) return;
      
      // Attempt to reconnect with exponential backoff
      const backoffDelay = Math.min(1000 * Math.pow(2, reconnectAttemptsRef.current), 30000);
      reconnectAttemptsRef.current++;
      
      console.log(`Attempting to reconnect in ${backoffDelay}ms (attempt ${reconnectAttemptsRef.current})`);
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, backoffDelay);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    wsRef.current = socket;
  };

  useEffect(() => {
    isMountedRef.current = true;
    connect();

    return () => {
      isMountedRef.current = false;
      
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, []);

  const sendBanUpdate = (newState: BanState): boolean => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'ban_update',
        data: newState
      }));
      return true;
    }
    console.error('Cannot send ban update - WebSocket not connected');
    return false;
  };

  const resetAll = (): boolean => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'reset_all'
      }));
      return true;
    }
    console.error('Cannot reset - WebSocket not connected');
    return false;
  };

  return (
    <WebSocketContext.Provider value={{ banState, isConnected, sendBanUpdate, resetAll }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}
