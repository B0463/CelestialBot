import { Message } from "discord.js";
import FarbeLog from "../functions/FarbeLog";
import MAIN from "./MAIN";
import help from "./help";
import ping from "./ping";
import mkmsg from "./mkmsg";
import delmsg from "./delmsg";
import sdmsg from "./sdmsg";
import rowchmsg from "./rowchmsg";
import { config } from "../main";

const prefix = config.prefix;

function verifyUserPrefix(msg: Message): boolean {
    const userCom = msg.content.split(" ")[0];
    const prefixLen = prefix.length;
    if(userCom.length < prefixLen) return false;
    const userPrefix = userCom.substring(0, prefixLen);
    if(userPrefix == prefix) {
        return true;
    } else return false;
}
async function init(msg: Message, Bot): Promise<number> {
    if(msg.author.bot) return 1;
    if(!msg.guild) return 1;
    if(msg.guildId != config.guildId) return 1;
    if(!verifyUserPrefix(msg)) return 1;
    switch(msg.content.split(" ")[0]) {
        case(prefix+"ping"):
            await ping.exec(msg, Bot);
            break;
        case(prefix+"help"):
            await help.exec(msg);
            break;
        case(prefix+"mkmsg"):
            await mkmsg.exec(msg);
            break;
        case(prefix+"delmsg"):
            await delmsg.exec(msg);
            break;
        case(prefix+"sdmsg"):
            await sdmsg.exec(msg);
            break;
        case(prefix+"rowchmsg"):
            await rowchmsg.exec(msg);
            break;
        default:
            await MAIN.exec(msg);
            break;
    }
    return 0;
}
const obj = {
    init
}
export default obj;

FarbeLog.ok("imported", "commands.ts");