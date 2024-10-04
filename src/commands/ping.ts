import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import FarbeLog from "../functions/FarbeLog";

export default {
    async exec(msg: Message, Bot) {
        const start = Date.now();
        let replyMsg;
        replyMsg = await msg.reply({embeds:[messageProcess.getFull("ping", "ping")]});
        const ping = Date.now() - start;
        const apiPing = Math.round(Bot.ws.ping);
        replyMsg.edit({embeds:[messageProcess.getFull("ping", "pong", {ping, apiPing})]});
    }
};
