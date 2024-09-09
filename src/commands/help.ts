import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import main from "../main";

export default {
    exec(msg: Message) {
        msg.reply({embeds:[
            messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("help"), {prefix: main.config.prefix}))
        ]});
    }
};