"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageProcess_1 = __importDefault(require("../functions/messageProcess"));
const main_1 = __importDefault(require("../main"));
exports.default = {
    exec(msg) {
        msg.reply({ embeds: [
                messageProcess_1.default.processColor(messageProcess_1.default.processPlaceholders(messageProcess_1.default.getCommandMsg("help"), { prefix: main_1.default.config.prefix }))
            ] });
    }
};
