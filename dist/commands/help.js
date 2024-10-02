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
const main_1 = require("../main");
const FarbeLog_1 = __importDefault(require("../functions/FarbeLog"));
exports.default = {
    exec(msg) {
        (() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield msg.reply({ embeds: [messageProcess_1.default.getFull("help", undefined, { prefix: main_1.config.prefix })] });
            }
            catch (e) {
                FarbeLog_1.default.error("Message", `${e.name}:\x1b[0m ${e.message}`);
            }
        }))();
    }
};
