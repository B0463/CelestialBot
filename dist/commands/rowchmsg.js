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
const sync_request_1 = __importDefault(require("sync-request"));
exports.default = {
    exec(msg) {
        (() => __awaiter(this, void 0, void 0, function* () {
            let hasBypass = 0;
            for (let i = 0; i < main_1.config.bypassRolesId.length; i++) {
                if (msg.member.roles.cache.has(main_1.config.bypassRolesId[i]))
                    hasBypass = 1;
            }
            if (!hasBypass) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "noPermission")] });
                return;
            }
            let msgsplit = msg.content.split(" ");
            if (msgsplit.length > 2 || msgsplit.length == 1) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "nameCountErr")] });
                return;
            }
            let cmtname = msg.content.substring(msgsplit[0].length + 1);
            if (!/^[a-zA-Z0-9_-]+$/.test(cmtname)) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "nameMatchErr")] });
                return;
            }
            if (msg.attachments.size !== 1) {
                let cmt = comments_1.default.getCmt(cmtname);
                switch (cmt.status) {
                    case -1:
                        yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "nameExistErr", { cmtname })] });
                        break;
                    default:
                        yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "cmtProperties", {
                                    properties: JSON.stringify(cmt.content, null, 4)
                                })] });
                }
                return;
            }
            const attachment = msg.attachments.first();
            let file;
            try {
                const response = (0, sync_request_1.default)('GET', attachment.url);
                if (response.statusCode !== 200) {
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "acessFileErr")] });
                    return;
                }
                const buffer = response.getBody();
                file = buffer.toString('utf-8');
                try {
                    const jsonObject = JSON.parse(file);
                }
                catch (e) {
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "jsonFileErr")] });
                    return;
                }
            }
            catch (e) {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "processFileErr")] });
                return;
            }
            let cmt = comments_1.default.rowChcmt(cmtname, file);
            switch (cmt.status) {
                case -1:
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "nameExistErr", { cmtname })] });
                    break;
                case -2:
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "fileErr", { cmtname })] });
                    break;
                default:
                    yield msg.reply({ embeds: [messageProcess_1.default.getFull("rowchmsg", "ok", { cmtname })] });
            }
        }))();
    }
};
