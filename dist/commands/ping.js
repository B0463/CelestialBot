"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageProcess_1 = __importDefault(require("../functions/messageProcess"));
exports.default = {
    exec(msg, Bot) {
        msg.reply({ embeds: [
                messageProcess_1.default.getFull("ping", "ping")
            ] }).then((replyMsg) => {
            const ping = replyMsg.createdTimestamp - msg.createdTimestamp;
            const apiPing = Math.round(Bot.ws.ping);
            replyMsg.edit({ embeds: [
                    messageProcess_1.default.getFull("ping", "pong", { ping, apiPing })
                ] });
        });
    }
};
