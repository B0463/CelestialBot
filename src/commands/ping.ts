import { Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import FarbeLog from "../functions/FarbeLog";

export default {
    exec(msg: Message, Bot) {
        (async () => {
            const start = Date.now();
            let replyMsg;
            try {
                replyMsg = await msg.reply({embeds:[messageProcess.getFull("ping", "ping")]});
            } catch(e) {
                FarbeLog.error("Message", `Error sending message:\n${e}`);
            }
            const ping = Date.now() - start;
            const apiPing = Math.round(Bot.ws.ping);
            try {
                replyMsg.edit({embeds:[messageProcess.getFull("ping", "pong", {ping, apiPing})]});
            } catch(e) {
                FarbeLog.error("Message", `Error sending message:\n${e}`);
            }
        })();
    }
};