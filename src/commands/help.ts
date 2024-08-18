import { APIEmbed, Message } from "discord.js";
export default {
    exec(msg: Message) {
        const embed: APIEmbed = {
            color: 0xff0000,
            title: "Help",
            description: "Help message"
        };
        msg.reply({ embeds: [embed] });
    }
};