"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageProcess_1 = __importDefault(require("../functions/messageProcess"));
const FarbeLog_1 = __importDefault(require("../functions/FarbeLog"));
exports.default = {
    exec(msg, Bot) {
        (() => __awaiter(this, void 0, void 0, function* () {
            const start = Date.now();
            let replyMsg;
            try {
                replyMsg = yield msg.reply({ embeds: [messageProcess_1.default.getFull("ping", "ping")] });
            }
            catch (e) {
                FarbeLog_1.default.error("Message", `Error sending message:\n${e}`);
            }
            const ping = Date.now() - start;
            const apiPing = Math.round(Bot.ws.ping);
            try {
                replyMsg.edit({ embeds: [messageProcess_1.default.getFull("ping", "pong", { ping, apiPing })] });
            }
            catch (e) {
                FarbeLog_1.default.error("Message", `Error sending message:\n${e}`);
            }
        }))();
    }
};
