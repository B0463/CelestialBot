import { Message } from "discord.js";
import MAIN from "./MAIN";
import help from "./help";
import ping from "./ping";
import mkmsg from "./mkmsg";
import delmsg from "./delmsg";
import sdmsg from "./sdmsg";

const config = require("../../config/bot.json");

function verifyUserPrefix(msg: Message): boolean {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = config.prefix.length;
    if(userCom.length < prefixLen) return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if(userPrefix == config.prefix) {
        return true;
    } else return false;
}
function init(msg: Message, Bot): number {
    if(msg.author.bot) return 1;
    if(!msg.guild) return 1;
    if(msg.guildId != config.guildId) return 1;
    if(!verifyUserPrefix(msg)) return 1;
    switch(msg.content.split(" ")[0]) {
        case(config.prefix+"ping"):
            ping.exec(msg, Bot);
            break;
        case(config.prefix+"help"):
            help.exec(msg);
            break;
        case(config.prefix+"mkmsg"):
            mkmsg.exec(msg);
            break;
        case(config.prefix+"delmsg"):
            delmsg.exec(msg);
            break;
        case(config.prefix+"sdmsg"):
            sdmsg.exec(msg);
            break;
        default:
            MAIN.exec(msg);
            break;
    }
    return 0;
}
const obj = {
    init
}
export default obj;