"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
const commandMsgs = {
    MAIN: require("../../messages/commands/MAIN.json"),
    help: require("../../messages/commands/help.json"),
    ping: require("../../messages/commands/ping.json"),
    mkmsg: require("../../messages/commands/mkmsg.json"),
    delmsg: require("../../messages/commands/delmsg.json"),
    sdmsg: require("../../messages/commands/sdmsg.json"),
    rowchmsg: require("../../messages/commands/rowchmsg.json"),
};
function processPlaceholders(obj, data) {
    if (typeof obj === 'string') {
        return obj.replace(/{{(.*?)}}/g, (_, key) => { var _a; return (_a = data[key.trim()]) !== null && _a !== void 0 ? _a : ''; });
    }
    if (Array.isArray(obj)) {
        return obj.map(item => processPlaceholders(item, data));
    }
    if (typeof obj === 'object' && obj !== null) {
        const result = {};
        for (const [key, value] of Object.entries(obj)) {
            result[key] = processPlaceholders(value, data);
        }
        return result;
    }
    return obj;
}
function processColor(command) {
    let result = command;
    if (typeof result.color === 'string') {
        result.color = parseInt(result.color, 16);
    }
    return result;
}
function getCommandMsg(command) {
    return commandMsgs[command];
}
function getFull(command, sub, data) {
    if (sub)
        return processColor(processPlaceholders(getCommandMsg(command)[sub], data));
    return processColor(processPlaceholders(getCommandMsg(command), data));
}
exports.default = {
    getCommandMsg,
    processPlaceholders,
    processColor,
    getFull
};
FarbeLog_1.default.ok("imported", "messageProcess.ts");
