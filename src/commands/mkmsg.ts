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
                    await msg.reply({embeds:[messageProcess.getFull("mkmsg", "noPermission")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length > 2 || msgsplit.length == 1) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("mkmsg", "nameCountErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length+1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("mkmsg", "nameMatchErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let cmtstatus = comments.createCmt(cmtname);
            switch(cmtstatus) {
                case -1:
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("mkmsg", "nameExistErr", {cmtname})]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                    break;
                case -2:
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("mkmsg", "fileErr", {cmtname})]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                    break;
                default:
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("mkmsg", "ok", {cmtname})]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                }
        })();
    }
};
