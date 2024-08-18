import { APIEmbed, Message } from "discord.js";
export default {
    exec(msg: Message) {
        const embed: APIEmbed = {
            color: 0xff0000,
            title: "Celestial",
            description: "Did you call me??"
        };
        msg.reply({ embeds: [embed] });
    }
};