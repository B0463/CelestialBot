"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageProcess_1 = __importDefault(require("../functions/messageProcess"));
const comments_1 = __importDefault(require("../functions/comments"));
const main_1 = __importDefault(require("../main"));
exports.default = {
    exec(msg) {
        let msgsplit = msg.content.split(" ");
        if (msgsplit.length > 2 || msgsplit.length == 1) {
            msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.getCommandMsg("sdmsg").nameCountErr)] });
            return;
        }
        let cmtname = msg.content.substring(msgsplit[0].length + 1);
        if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
            msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.getCommandMsg("sdmsg").nameMatchErr)] });
            return;
        }
        let cmt = comments_1.default.getCmt(cmtname);
        switch (cmt.status) {
            case -1:
                msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.processPlaceholders(messageProcess_1.default.getCommandMsg("sdmsg").nameNotExistErr, { cmtname }))] });
                break;
            default:
                if (cmt.content.admin) {
                    let hasBypass = 0;
                    for (let i = 0; i < main_1.default.config.bypassRolesId.length; i++) {
                        if (msg.member.roles.cache.has(main_1.default.config.bypassRolesId[i]))
                            hasBypass = 1;
                    }
                    if (!hasBypass) {
                        msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.getCommandMsg("rowchmsg").noPermission)] });
                        return;
                    }
                }
                if (cmt.content.reply) {
                    msg.reply({
                        content: cmt.content.content,
                        embeds: cmt.content.embeds.map(embed => messageProcess_1.default.processColor(embed))
                    });
                    return;
                }
                msg.channel.send({
                    content: cmt.content.content,
                    embeds: cmt.content.embeds.map(embed => messageProcess_1.default.processColor(embed))
                });
        }
    }
};
