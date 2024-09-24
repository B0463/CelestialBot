import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import main from "../main";

export default {
    exec(msg: Message) {
        msg.reply({embeds:[
            messageProcess.getFull("MAIN", undefined, {prefix: main.config.prefix})
        ]});
    }
};