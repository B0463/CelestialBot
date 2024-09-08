import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { cmtResponse } from "../functions/comments";

export default {
    exec(msg: Message) {
        let msgsplit = msg.content.split(" ");
        if(msgsplit.length > 2 || msgsplit.length == 1) {
            msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("sdmsg").nameCountErr)]});
            return;
        }
        let cmtname = msg.content.substring(msgsplit[0].length+1);
        if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
            msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("sdmsg").nameMatchErr)]});
            return;
        }
        let cmt: cmtResponse = comments.getCmt(cmtname);
        switch(cmt.status) {
            case -1:
                msg.reply({embeds:[messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("sdmsg").nameNotExistErr, {cmtname}))]});
                break;
            default:
                msg.reply({embeds:[messageProcess.processColor(cmt.content)]});
        }
    }
};
