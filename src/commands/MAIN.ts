import { APIEmbed, Message } from "discord.js";
import messageProcess from "../functions/messageProcess";
import { config } from "../main";
import FarbeLog from "../functions/FarbeLog";

export default {
    async exec(msg: Message) {
        await msg.reply({embeds: [messageProcess.getFull("MAIN", undefined, { prefix: config.prefix })]});
    }
};
