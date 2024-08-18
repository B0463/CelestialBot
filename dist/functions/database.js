"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const db = new better_sqlite3_1.default('./DB/users.sqlite');
function inicialize() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          username TEXT,
          discriminator TEXT
        )
    `);
    FarbeLog_1.default.ok.withHour("started", "database");
}
exports.default = {
    inicialize
};
