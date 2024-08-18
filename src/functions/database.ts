import { APIEmbed, Message } from "discord.js";
import Database from "better-sqlite3";
import FarbeLog from "./FarbeLog";

const db = new Database('./DB/users.sqlite');

function inicialize() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT,
          discriminator TEXT
        )
    `);
    FarbeLog.ok.withHour("started", "database");
}

export default {
    inicialize
};