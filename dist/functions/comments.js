"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const FarbeLog_1 = __importDefault(require("./FarbeLog"));
function rowChcmt(cmtname, file) {
    const filepath = path_1.default.join(__dirname, '../../messages/comments', `${cmtname}.json`);
    let res = {
        status: 0,
        content: {}
    };
    if (!fs_1.default.existsSync(filepath)) {
        res.status = -1;
        return res;
    }
    try {
        fs_1.default.writeFileSync(filepath, file, 'utf8');
        res.status = 0;
        return res;
    }
    catch (e) {
        res.status = -2;
        return res;
    }
}
function getCmt(cmtname) {
    const filepath = path_1.default.join(__dirname, '../../messages/comments', `${cmtname}.json`);
    let res = {
        status: 0,
        content: {}
    };
    if (!fs_1.default.existsSync(filepath)) {
        res.status = -1;
        return res;
    }
    res.content = JSON.parse(fs_1.default.readFileSync(filepath, 'utf8').toString());
    res.status = 0;
    return res;
}
function deleteCmt(cmtname) {
    const filepath = path_1.default.join(__dirname, '../../messages/comments', `${cmtname}.json`);
    if (fs_1.default.existsSync(filepath)) {
        fs_1.default.unlinkSync(filepath);
        return 0;
    }
    else
        return -1;
}
function createCmt(cmtname) {
    const filepath = path_1.default.join(__dirname, '../../messages/comments', `${cmtname}.json`);
    if (fs_1.default.existsSync(filepath))
        return -1;
    let initialContent = {
        admin: true,
        reply: true,
        embeds: [
            {
                color: "ff0000",
                title: cmtname
            }
        ]
    };
    try {
        fs_1.default.writeFileSync(filepath, JSON.stringify(initialContent, null, 4), 'utf8');
        return 0;
    }
    catch (e) {
        return -2;
    }
}
exports.default = {
    createCmt,
    deleteCmt,
    getCmt,
    rowChcmt
};
FarbeLog_1.default.ok("imported", "comments.ts");
