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
const FarbeLog_1 = __importDefault(require("../functions/FarbeLog"));
exports.default = {
    exec(msg) {
        (() => __awaiter(this, void 0, void 0, function* () {
            if (!(0, main_1.hasBypass)(msg)) {
                try {
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("mkmsg", "noPermission")] });
                }
                catch (e) {
                    FarbeLog_1.default.error("Message", `${e.name}:\x1b[0m ${e.message}`);
                }
                return;
            }
            let msgsplit = msg.content.split(" ");
            if (msgsplit.length > 2 || msgsplit.length == 1) {
                try {
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("mkmsg", "nameCountErr")] });
                }
                catch (e) {
                    FarbeLog_1.default.error("Message", `${e.name}:\x1b[0m ${e.message}`);
                }
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length + 1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                try {
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("mkmsg", "nameMatchErr")] });
                }
                catch (e) {
                    FarbeLog_1.default.error("Message", `${e.name}:\x1b[0m ${e.message}`);
                }
                return;
            }
            let cmtstatus = comments_1.default.createCmt(cmtname);
            switch (cmtstatus) {
                case -1:
                    try {
                        yield msg.reply({ embeds: [messageProcess_1.default.getFull("mkmsg", "nameExistErr", { cmtname })] });
                    }
                    catch (e) {
                        FarbeLog_1.default.error("Message", `${e.name}:\x1b[0m ${e.message}`);
                    }
                    break;
                case -2:
                    try {
                        yield msg.reply({ embeds: [messageProcess_1.default.getFull("mkmsg", "fileErr", { cmtname })] });
                    }
                    catch (e) {
                        FarbeLog_1.default.error("Message", `${e.name}:\x1b[0m ${e.message}`);
                    }
                    break;
                default:
                    try {
                        yield msg.reply({ embeds: [messageProcess_1.default.getFull("mkmsg", "ok", { cmtname })] });
                    }
                    catch (e) {
                        FarbeLog_1.default.error("Message", `${e.name}:\x1b[0m ${e.message}`);
                    }
            }
        }))();
    }
};
