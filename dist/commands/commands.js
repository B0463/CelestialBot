"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MAIN_1 = __importDefault(require("./MAIN"));
const help_1 = __importDefault(require("./help"));
const ping_1 = __importDefault(require("./ping"));
const config = require("../../config/bot.json");
function verifyUserPrefix(msg) {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = config.prefix.length;
    if (userCom.length < prefixLen)
        return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if (userPrefix == config.prefix) {
        return true;
    }
    else
        return false;
}
function init(msg, Bot) {
    if (msg.author.bot)
        return 1;
    if (!msg.guild)
        return 1;
    if (msg.guildId != config.guildId)
        return 1;
    if (!verifyUserPrefix(msg))
        return 1;
    switch (msg.content.split(" ")[0]) {
        case (config.prefix + "ping"):
            ping_1.default.exec(msg, Bot);
            break;
        case (config.prefix + "help"):
            help_1.default.exec(msg);
            break;
        default:
            MAIN_1.default.exec(msg);
            break;
    }
    return 0;
}
const obj = {
    init
};
exports.default = obj;
