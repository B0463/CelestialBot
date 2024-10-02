import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { cmtResponse } from "../functions/comments";
import main from "../main";

export default {
    exec(msg: Message) {
        (async () => {
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length > 2 || msgsplit.length == 1) {
                await msg.reply({embeds:[messageProcess.getFull("sdmsg", "nameCountErr")]});
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length+1);
            if(!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                await msg.reply({embeds:[messageProcess.getFull("sdmsg", "nameMatchErr")]});
                return;
            }
            let cmt: cmtResponse = comments.getCmt(cmtname);
            switch(cmt.status) {
                case -1:
                    await msg.reply({embeds:[messageProcess.getFull("sdmsg", "nameNotExistErr", {cmtname})]});
                    break;
                default:
                    if(cmt.content.admin) {
                        let hasBypass = 0;
                        for(let i=0;i<main.config.bypassRolesId.length;i++) {
                            if(msg.member.roles.cache.has(main.config.bypassRolesId[i])) hasBypass = 1;
                        }
                        if(!hasBypass) {
                            await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "noPermission")]});
                            return;
                        }
                    }
                    if(cmt.content.reply) {
                        await msg.reply({
                            content: cmt.content.content,
                            embeds: cmt.content.embeds.map(embed => messageProcess.processColor(embed))
                        });
                        return;
                    }
                    await msg.channel.send({
                        content: cmt.content.content,
                        embeds: cmt.content.embeds.map(embed => messageProcess.processColor(embed))
                    });
            }
        })();
    }
};
