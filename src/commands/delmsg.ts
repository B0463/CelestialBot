import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import main from "../main";

export default {
    exec(msg: Message) {
        (async () => {
            let hasBypass = 0;
            for(let i=0;i<main.config.bypassRolesId.length;i++) {
                if(msg.member.roles.cache.has(main.config.bypassRolesId[i])) hasBypass = 1;
            }
            if(!hasBypass) {
                await msg.reply({embeds:[messageProcess.getFull("delmsg", "noPermission")]});
                return;
            }
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length > 2 || msgsplit.length == 1) {
                await msg.reply({embeds:[messageProcess.getFull("delmsg", "nameCountErr")]});
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length+1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                await msg.reply({embeds:[messageProcess.getFull("delmsg", "nameMatchErr")]});
                return;
            }
            let cmtstatus = comments.deleteCmt(cmtname);
            if(cmtstatus != 0) {
                await msg.reply({embeds:[messageProcess.getFull("delmsg", "nameNotExistErr", {cmtname})]});
                return;
            }
            await msg.reply({embeds:[messageProcess.getFull("delmsg", "ok", {cmtname})]});
        })();
    }
};
