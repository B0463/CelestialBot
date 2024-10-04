"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageProcess_1 = __importDefault(require("../functions/messageProcess"));
const comments_1 = __importDefault(require("../functions/comments"));
const main_1 = require("../main");
exports.default = {
    exec(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, main_1.hasBypass)(msg)) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("delmsg", "noPermission")] });
                return;
            }
            let msgsplit = msg.content.split(" ");
            if (msgsplit.length > 2 || msgsplit.length == 1) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("delmsg", "nameCountErr")] });
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length + 1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("delmsg", "nameMatchErr")] });
                return;
            }
            let cmtstatus = comments_1.default.deleteCmt(cmtname);
            if (cmtstatus != 0) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("delmsg", "nameNotExistErr", { cmtname })] });
                return;
            }
            yield msg.reply({ embeds: [messageProcess_1.default.getFull("delmsg", "ok", { cmtname })] });
        });
    }
};
