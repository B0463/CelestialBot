import { APIEmbed, Message } from "discord.js";
import fs from "fs";
import path from "path";

function deleteCmt(cmtname: string): number {
    const filepath = path.join(__dirname, '../../messages/comments', `${cmtname}.json`);
    if(fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
        return 0;
    }
    else return -1;
}

function createCmt(cmtname: string): number {
    const filepath = path.join(__dirname, '../../messages/comments', `${cmtname}.json`);
    if(fs.existsSync(filepath)) return -1;
    let initialContent = {
        color: "ff0000",
        title: cmtname
    }
    try {
        fs.writeFileSync(filepath, JSON.stringify(initialContent, null, 4), 'utf8');
        return 0;
    } catch (e) {
        return -2;
    }
}

export default {
    createCmt,
    deleteCmt
};