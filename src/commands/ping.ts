import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";

export default {
    exec(msg: Message, Bot) {
        (async () => {
            const start = Date.now();
            const replyMsg = await msg.reply({embeds:[messageProcess.getFull("ping", "ping")]});
            const ping = Date.now() - start;
            const apiPing = Math.round(Bot.ws.ping);
            replyMsg.edit({embeds:[messageProcess.getFull("ping", "pong", {ping, apiPing})]});
        })();
    }
};