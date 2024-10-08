"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function createCmt(cmtname) {
    let filepath = `../messages/comments/${cmtname}.json`;
    if (fs_1.default.existsSync(filepath))
        return -1;
    let initialContent = {
        color: "ff0000",
        title: cmtname
    };
    try {
        fs_1.default.writeFileSync(filepath, JSON.stringify(initialContent, null, 4), 'utf8');
    }
    catch (e) {
        return -2;
    }
}
exports.default = {
    createCmt
};
