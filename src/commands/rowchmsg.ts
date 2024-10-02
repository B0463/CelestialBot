import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { cmtResponse } from "../functions/comments";
import main from "../main";
import request from 'sync-request';

export default {
    exec(msg: Message) {
        (async () => {
            let hasBypass = 0;
            for(let i=0;i<main.config.bypassRolesId.length;i++) {
                if(msg.member.roles.cache.has(main.config.bypassRolesId[i])) hasBypass = 1;
            }
            if(!hasBypass) {
                await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "noPermission")]});
                return;
            }
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length > 2 || msgsplit.length == 1) {
                await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameCountErr")]});
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length+1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameMatchErr")]});
                return;
            }
            if(msg.attachments.size !== 1) {
                let cmt: cmtResponse = comments.getCmt(cmtname);
                switch(cmt.status) {
                    case -1:
                        await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameExistErr", {cmtname})]});
                        break;
                    default:
                        await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "cmtProperties", {
                            properties: JSON.stringify(cmt.content, null, 4)
                        })]});
                }
                return;
            }

            const attachment = msg.attachments.first();
            let file;

            try {
                const response = request('GET', attachment!.url);
                if(response.statusCode !== 200) {
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "acessFileErr")]});
                    return;
                }
                const buffer = response.getBody();
                file = buffer.toString('utf-8');
                try {
                    const jsonObject = JSON.parse(file);
                } catch (e) {
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "jsonFileErr")]});
                    return;
                }
        
            } catch (e) {
                await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "processFileErr")]});
                return;
            }

            let cmt: cmtResponse = comments.rowChcmt(cmtname, file);
            switch(cmt.status) {
                case -1:
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameExistErr", {cmtname})]});
                    break;
                case -2:
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "fileErr", {cmtname})]});
                    break;
                default:
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "ok", {cmtname})]});
            }
        })();
    }
};
