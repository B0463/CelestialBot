import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import { config } from "../main";

export default {
    exec(msg: Message) {
        (async () => {
            await msg.reply({embeds:[messageProcess.getFull("help", undefined, {prefix: config.prefix})]});
        })();
    }
};