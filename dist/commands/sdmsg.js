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
const main_1 = __importDefault(require("../main"));
exports.default = {
    exec(msg) {
        (() => __awaiter(this, void 0, void 0, function* () {
            let msgsplit = msg.content.split(" ");
            if (msgsplit.length > 2 || msgsplit.length == 1) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("sdmsg", "nameCountErr")] });
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length + 1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("sdmsg", "nameMatchErr")] });
                return;
            }
            let cmt = comments_1.default.getCmt(cmtname);
            switch (cmt.status) {
                case -1:
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("sdmsg", "nameNotExistErr", { cmtname })] });
                    break;
                default:
                    if (cmt.content.admin) {
                        let hasBypass = 0;
                        for (let i = 0; i < main_1.default.config.bypassRolesId.length; i++) {
                            if (msg.member.roles.cache.has(main_1.default.config.bypassRolesId[i]))
                                hasBypass = 1;
                        }
                        if (!hasBypass) {
                            yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "noPermission")] });
                            return;
                        }
                    }
                    if (cmt.content.reply) {
                        yield msg.reply({
                            content: cmt.content.content,
                            embeds: cmt.content.embeds.map(embed => messageProcess_1.default.processColor(embed))
                        });
                        return;
                    }
                    yield msg.channel.send({
                        content: cmt.content.content,
                        embeds: cmt.content.embeds.map(embed => messageProcess_1.default.processColor(embed))
                    });
            }
        }))();
    }
};
