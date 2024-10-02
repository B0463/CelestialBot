import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { cmtResponse } from "../functions/comments";
import { hasBypass } from "../main";
import FarbeLog from "../functions/FarbeLog";

export default {
    exec(msg: Message) {
        (async () => {
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length > 2 || msgsplit.length == 1) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("sdmsg", "nameCountErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length+1);
            if(!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("sdmsg", "nameMatchErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let cmt: cmtResponse = comments.getCmt(cmtname);
            switch(cmt.status) {
                case -1:
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("sdmsg", "nameNotExistErr", {cmtname})]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                    break;
                default:
                    if(cmt.content.admin) {
                        if(!hasBypass(msg)) {
                            try {
                                await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "noPermission")]});
                            } catch(e) {
                                FarbeLog.error("Message", `Error sending message:\n${e}`);
                            }
                            return;
                        }
                    }
                    if(cmt.content.reply) {
                        try {
                            await msg.reply({
                                content: cmt.content.content,
                                embeds: cmt.content.embeds.map(embed => messageProcess.processColor(embed))
                            });
                        } catch(e) {
                            FarbeLog.error("Message", `Error sending message:\n${e}`);
                        }
                        return;
                    }
                    try {
                        await msg.channel.send({
                            content: cmt.content.content,
                            embeds: cmt.content.embeds.map(embed => messageProcess.processColor(embed))
                        });
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
            }
        })();
    }
};
