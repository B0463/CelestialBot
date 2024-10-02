import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { hasBypass } from "../main";

export default {
    exec(msg: Message) {
        (async () => {
            if(!hasBypass(msg)) {
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
