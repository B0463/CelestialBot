"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MAIN_1 = __importDefault(require("./MAIN"));
const help_1 = __importDefault(require("./help"));
const ping_1 = __importDefault(require("./ping"));
const mkmsg_1 = __importDefault(require("./mkmsg"));
const delmsg_1 = __importDefault(require("./delmsg"));
const sdmsg_1 = __importDefault(require("./sdmsg"));
const rowchmsg_1 = __importDefault(require("./rowchmsg"));
const main_1 = require("../main");
const prefix = main_1.config.prefix;
function verifyUserPrefix(msg) {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = prefix.length;
    if (userCom.length < prefixLen)
        return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if (userPrefix == prefix) {
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
    if (msg.guildId != main_1.config.guildId)
        return 1;
    if (!verifyUserPrefix(msg))
        return 1;
    switch (msg.content.split(" ")[0]) {
        case (prefix + "ping"):
            ping_1.default.exec(msg, Bot);
            break;
        case (prefix + "help"):
            help_1.default.exec(msg);
            break;
        case (prefix + "mkmsg"):
            mkmsg_1.default.exec(msg);
            break;
        case (prefix + "delmsg"):
            delmsg_1.default.exec(msg);
            break;
        case (prefix + "sdmsg"):
            sdmsg_1.default.exec(msg);
            break;
        case (prefix + "rowchmsg"):
            rowchmsg_1.default.exec(msg);
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
