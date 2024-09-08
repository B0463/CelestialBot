import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { cmtResponse } from "../functions/comments";
import main from "../main";
import request from 'sync-request';

export default {
    exec(msg: Message) {
        let hasBypass = 0;
        for(let i=0;i<main.config.bypassRolesId.length;i++) {
            if(msg.member.roles.cache.has(main.config.bypassRolesId[i])) hasBypass = 1;
        }
        if(!hasBypass) {
            msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("rowchmsg").noPermission)]});
            return;
        }
        let msgsplit = msg.content.split(" ");
        if(msgsplit.length > 2 || msgsplit.length == 1) {
            msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("rowchmsg").nameCountErr)]});
            return;
        }
        let cmtname = msg.content.substring(msgsplit[0].length+1);
        if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
            msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("rowchmsg").nameMatchErr)]});
            return;
        }
        if(msg.attachments.size !== 1) {
            let cmt: cmtResponse = comments.getCmt(cmtname);
            switch(cmt.status) {
                case -1:
                    msg.reply({embeds:[messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("rowchmsg").nameExistErr, {cmtname}))]});
                    break;
                default:
                    msg.reply({embeds:[messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("rowchmsg").cmtProperties, {
                        properties: JSON.stringify(cmt.content, null, 4)
                    }))]});
            }
            return;
        }

        const attachment = msg.attachments.first();
        let file;

        try {
            const response = request('GET', attachment!.url);
            if(response.statusCode !== 200) {
                msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("rowchmsg").acessFileErr)]});
                return;
            }
            const buffer = response.getBody();
            file = buffer.toString('utf-8');
            try {
                const jsonObject = JSON.parse(file);
            } catch (e) {
                msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("rowchmsg").jsonFileErr)]});
                return;
            }
    
        } catch (e) {
            msg.reply({embeds:[messageProcess.processColor(messageProcess.getCommandMsg("rowchmsg").processFileErr)]});
            return;
        }

        let cmt: cmtResponse = comments.rowChcmt(cmtname, file);
        switch(cmt.status) {
            case -1:
                msg.reply({embeds:[messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("rowchmsg").nameExistErr, {cmtname}))]});
                break;
            case -2:
                msg.reply({embeds:[messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("rowchmsg").fileErr, {cmtname}))]});
                break;
            default:
                msg.reply({embeds:[messageProcess.processColor(messageProcess.processPlaceholders(messageProcess.getCommandMsg("rowchmsg").ok, {cmtname}))]});
        }
    }
};
