import { Message } from "discord.js";
import embedG from "../functions/embed";
export default {
    exec(msg: Message) {
        const embed = embedG.createEmbed({
            color: "#ff0000",
            title: "Celestial",
            description: "Did you call me??"
        });
        msg.reply({ embeds: [embed] });
    }
};