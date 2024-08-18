import { APIEmbed, Message } from "discord.js";
export default {
    exec(msg: Message, Bot) {
        const embed: APIEmbed = {
            color: 0xff0000,
            title: "🏓 Ping",
            description: `Latency is \`...ms\`. API Latency is \`...ms\``
        };
        msg.reply({ embeds: [embed] }).then((replyMsg)=>{
            const embed: APIEmbed = {
                color: 0xff0000,
                title: "🏓 Pong",
                description: `Latency is \`${replyMsg.createdTimestamp - msg.createdTimestamp}ms\`. API Latency is \`${Math.round(Bot.ws.ping)}ms\``
            };
            replyMsg.edit({ embeds: [embed] });
        });
    }
};