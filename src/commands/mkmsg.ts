import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import comments from "../functions/comments";
import { hasBypass } from "../main";
import FarbeLog from "../functions/FarbeLog";

export default {
    async exec(msg: Message) {
        if (!hasBypass(msg)) {
            await msg.reply({ embeds: [messageProcess.getFull("mkmsg", "noPermission")] });
            return;
        }

        let msgsplit = msg.content.split(" ");
        if (msgsplit.length > 2 || msgsplit.length == 1) {
            await msg.reply({ embeds: [messageProcess.getFull("mkmsg", "nameCountErr")] });
            return;
        }

        let cmtname = msg.content.substring(msgsplit[0].length + 1);
        if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
            await msg.reply({ embeds: [messageProcess.getFull("mkmsg", "nameMatchErr")] });
            return;
        }

        let cmtstatus = comments.createCmt(cmtname);
        switch (cmtstatus) {
            case -1:
                await msg.reply({ embeds: [messageProcess.getFull("mkmsg", "nameExistErr", { cmtname })] });
                break;
            case -2:
                await msg.reply({ embeds: [messageProcess.getFull("mkmsg", "fileErr", { cmtname })] });
                break;
            default:
                await msg.reply({ embeds: [messageProcess.getFull("mkmsg", "ok", { cmtname })] });
        }
    }
};
