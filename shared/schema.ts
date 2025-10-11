import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export interface BanState {
  killerPerks: string[];
  survivorPerks: string[];
  maps: string[];
  killers: string[];
}

export const banStateSchema = z.object({
  killerPerks: z.array(z.string()),
  survivorPerks: z.array(z.string()),
  maps: z.array(z.string()),
  killers: z.array(z.string()),
});

export type WSMessage = 
  | { type: 'ban_update'; data: BanState }
  | { type: 'reset_all' };
