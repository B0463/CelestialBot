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
                msg.reply({ embeds: [messageProcess_1.default.processColor(cmt.content)] });
        }
    }
};
