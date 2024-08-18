"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    exec(msg) {
        const embed = {
            color: 0xff0000,
            title: "Celestial",
            description: "Did you call me??"
        };
        msg.reply({ embeds: [embed] });
    }
};
