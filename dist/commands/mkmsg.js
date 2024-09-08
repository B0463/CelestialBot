"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageProcess_1 = __importDefault(require("../functions/messageProcess"));
const comments_1 = __importDefault(require("../functions/comments"));
exports.default = {
    exec(msg) {
        let msgsplit = msg.content.split(" ");
        if (msgsplit.length > 2 || msgsplit.length == 1) {
            msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.getCommandMsg("mkmsg").nameCountErr)] });
            return;
        }
        let cmtname = msg.content.substring(msgsplit[0].length + 1);
        if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
            msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.getCommandMsg("mkmsg").nameMatchErr)] });
            return;
        }
        let cmtstatus = comments_1.default.createCmt(cmtname);
        switch (cmtstatus) {
            case -1:
                msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.processPlaceholders(messageProcess_1.default.getCommandMsg("mkmsg").nameExistErr, { cmtname }))] });
                break;
            case -2:
                msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.processPlaceholders(messageProcess_1.default.getCommandMsg("mkmsg").fileErr, { cmtname }))] });
                break;
            default:
                msg.reply({ embeds: [messageProcess_1.default.processColor(messageProcess_1.default.processPlaceholders(messageProcess_1.default.getCommandMsg("mkmsg").ok, { cmtname }))] });
        }
    }
};
