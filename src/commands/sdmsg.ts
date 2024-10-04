import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { cmtResponse } from "../functions/comments";
import { hasBypass } from "../main";
import FarbeLog from "../functions/FarbeLog";

export default {
    async exec(msg: Message) {
        let msgsplit = msg.content.split(" ");
        if (msgsplit.length > 2 || msgsplit.length == 1) {
            await msg.reply({ embeds: [messageProcess.getFull("sdmsg", "nameCountErr")] });
            return;
        }

        let cmtname = msg.content.substring(msgsplit[0].length + 1);
        if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
            await msg.reply({ embeds: [messageProcess.getFull("sdmsg", "nameMatchErr")] });
            return;
        }

        let cmt: cmtResponse = comments.getCmt(cmtname);
        switch (cmt.status) {
            case -1:
                await msg.reply({ embeds: [messageProcess.getFull("sdmsg", "nameNotExistErr", { cmtname })] });
                break;
            default:
                if (cmt.content.admin) {
                    if (!hasBypass(msg)) {
                        await msg.reply({ embeds: [messageProcess.getFull("rowchmsg", "noPermission")] });
                        return;
                    }
                }
                if (cmt.content.reply) {
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
    }
};
