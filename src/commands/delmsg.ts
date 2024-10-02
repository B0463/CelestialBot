import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { hasBypass } from "../main";
import FarbeLog from "../functions/FarbeLog";

export default {
    exec(msg: Message) {
        (async () => {
            if(!hasBypass(msg)) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("delmsg", "noPermission")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length > 2 || msgsplit.length == 1) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("delmsg", "nameCountErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length+1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("delmsg", "nameMatchErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let cmtstatus = comments.deleteCmt(cmtname);
            if(cmtstatus != 0) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("delmsg", "nameNotExistErr", {cmtname})]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            try {
                await msg.reply({embeds:[messageProcess.getFull("delmsg", "ok", {cmtname})]});
            } catch(e) {
                FarbeLog.error("Message", `Error sending message:\n${e}`);
            }
        })();
    }
};
