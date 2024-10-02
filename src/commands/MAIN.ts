import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import { config } from "../main";
import FarbeLog from "../functions/FarbeLog";

export default {
    exec(msg: Message) {
        (async () => {
            try {
                await msg.reply({embeds:[messageProcess.getFull("MAIN", undefined, {prefix: config.prefix})]});
            } catch(e) {
                FarbeLog.error("Message", `Error sending message:\n${e}`);
            }
        })();
    }
};