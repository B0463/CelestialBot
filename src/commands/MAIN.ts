import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";

export default {
    exec(msg: Message) {
        msg.reply({embeds:[
            messageProcess.processColor(messageProcess.getCommandMsg("MAIN"))
        ]});
    }
};