import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { sessions, messages } from "./schema";
import { randomUUID } from "crypto";
import { Message } from "../types";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "..", "data");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const sqlite = new Database(path.join(dataDir, "storm.db"));
export const db = drizzle(sqlite);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    title TEXT
  );
  
  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    timestamp INTEGER NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
  );
`);

export function createSession(): string {
  const id = randomUUID();
  const now = new Date();
  sqlite.prepare("INSERT INTO sessions (id, created_at, title) VALUES (?, ?, ?)").run(
    id,
    now.getTime(),
    "New Conversation"
  );
  return id;
}

export function getSession(sessionId: string) {
  return sqlite.prepare("SELECT * FROM sessions WHERE id = ?").get(sessionId);
}

export function getMessages(sessionId: string): Message[] {
  const rows = sqlite
    .prepare("SELECT * FROM messages WHERE session_id = ? ORDER BY timestamp ASC")
    .all(sessionId) as Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: number;
  }>;
  
  return rows.map((row) => ({
    id: row.id,
    role: row.role,
    content: row.content,
    timestamp: new Date(row.timestamp),
  }));
}

export function addMessage(sessionId: string, message: Message) {
  sqlite
    .prepare(
      "INSERT INTO messages (id, session_id, role, content, timestamp) VALUES (?, ?, ?, ?, ?)"
    )
    .run(message.id, sessionId, message.role, message.content, message.timestamp.getTime());
}

export function getOrCreateCurrentSession(): string {
  const currentSessionIdPath = path.join(dataDir, "current_session");
  
  if (fs.existsSync(currentSessionIdPath)) {
    const sessionId = fs.readFileSync(currentSessionIdPath, "utf-8").trim();
    if (getSession(sessionId)) {
      return sessionId;
    }
  }
  
  const newSessionId = createSession();
  fs.writeFileSync(currentSessionIdPath, newSessionId);
  return newSessionId;
}