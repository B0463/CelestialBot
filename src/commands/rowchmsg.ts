import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { cmtResponse } from "../functions/comments";
import { hasBypass } from "../main";
import request from 'sync-request';
import FarbeLog from "../functions/FarbeLog";

export default {
    exec(msg: Message) {
        (async () => {
            if(!hasBypass(msg)) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "noPermission")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let msgsplit = msg.content.split(" ");
            if(msgsplit.length > 2 || msgsplit.length == 1) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameCountErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length+1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameMatchErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }
            if(msg.attachments.size !== 1) {
                let cmt: cmtResponse = comments.getCmt(cmtname);
                switch(cmt.status) {
                    case -1:
                        try {
                            await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameExistErr", {cmtname})]});
                        } catch(e) {
                            FarbeLog.error("Message", `Error sending message:\n${e}`);
                        }
                        break;
                    default:
                        try {
                            await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "cmtProperties", {
                                properties: JSON.stringify(cmt.content, null, 4)
                            })]});
                        } catch(e) {
                            FarbeLog.error("Message", `Error sending message:\n${e}`);
                        }
                }
                return;
            }

            const attachment = msg.attachments.first();
            let file;

            try {
                const response = request('GET', attachment!.url);
                if(response.statusCode !== 200) {
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "acessFileErr")]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                    return;
                }
                const buffer = response.getBody();
                file = buffer.toString('utf-8');
                try {
                    const jsonObject = JSON.parse(file);
                } catch (e) {
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "jsonFileErr")]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                    return;
                }
        
            } catch (e) {
                try {
                    await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "processFileErr")]});
                } catch(e) {
                    FarbeLog.error("Message", `Error sending message:\n${e}`);
                }
                return;
            }

            let cmt: cmtResponse = comments.rowChcmt(cmtname, file);
            switch(cmt.status) {
                case -1:
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "nameExistErr", {cmtname})]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                    break;
                case -2:
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "fileErr", {cmtname})]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
                    break;
                default:
                    try {
                        await msg.reply({embeds:[messageProcess.getFull("rowchmsg", "ok", {cmtname})]});
                    } catch(e) {
                        FarbeLog.error("Message", `Error sending message:\n${e}`);
                    }
            }
        })();
    }
};
