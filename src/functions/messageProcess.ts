import { APIEmbed, Message } from "discord.js";

const commandMsgs = {
    MAIN: require("../../messages/commands/MAIN.json"),
    help: require("../../messages/commands/help.json"),
    ping: require("../../messages/commands/ping.json"),
    mkmsg: require("../../messages/commands/mkmsg.json"),
    delmsg: require("../../messages/commands/delmsg.json"),
    sdmsg: require("../../messages/commands/sdmsg.json"),
    rowchmsg: require("../../messages/commands/rowchmsg.json"),
} 

function processPlaceholders(obj, data) {
    if(typeof obj === 'string') {
        return obj.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] ?? '');
    }
    if(Array.isArray(obj)) {
        return obj.map(item => processPlaceholders(item, data));
    }
    if(typeof obj === 'object' && obj !== null) {
        const result: any = {};
        for(const [key, value] of Object.entries(obj)) {
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

function getFull(command: string, sub?: string, data?: any) {
    if(sub) return processColor(processPlaceholders(getCommandMsg(command)[sub], data));
    return processColor(processPlaceholders(getCommandMsg(command), data));
}

export default {
    getCommandMsg,
    processPlaceholders,
    processColor,
    getFull
};