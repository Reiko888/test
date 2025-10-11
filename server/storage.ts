import { type User, type InsertUser, type BanState } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getBanState(): Promise<BanState>;
  updateBanState(banState: BanState): Promise<BanState>;
  resetBanState(): Promise<BanState>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private banState: BanState;

  constructor() {
    this.users = new Map();
    this.banState = {
      killerPerks: [],
      survivorPerks: [],
      maps: [],
      killers: []
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getBanState(): Promise<BanState> {
    return { ...this.banState };
  }

  async updateBanState(banState: BanState): Promise<BanState> {
    this.banState = { ...banState };
    return this.banState;
  }

  async resetBanState(): Promise<BanState> {
    this.banState = {
      killerPerks: [],
      survivorPerks: [],
      maps: [],
      killers: []
    };
    return this.banState;
  }
}

export const storage = new MemStorage();
