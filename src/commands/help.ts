import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import { config } from "../main";
import FarbeLog from "../functions/FarbeLog";

export default {
    exec(msg: Message) {
        (async () => {
            try {
                await msg.reply({embeds:[messageProcess.getFull("help", undefined, {prefix: config.prefix})]});
            } catch(e) {
                FarbeLog.error("Message", `${e.name}:\x1b[0m ${e.message}`);
            }
        })();
    }
};