import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";

export default {
    exec(msg: Message, Bot) {
        msg.reply({embeds:[
            messageProcess.processColor(messageProcess.getCommandMsg("ping").ping)
        ]}).then((replyMsg)=>{
            const ping = replyMsg.createdTimestamp - msg.createdTimestamp;
            const apiPing = Math.round(Bot.ws.ping);
            replyMsg.edit({embeds:[
                messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("ping").pong, {ping, apiPing}))
            ]});
        });
    }
};