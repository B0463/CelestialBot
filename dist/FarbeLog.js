"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUTCDate() {
    const now = new Date;
    let Day = now.getUTCDate();
    let Month = now.getUTCMonth() + 1;
    let Year = now.getUTCFullYear();
    let Hour = now.getUTCHours();
    let Minute = now.getUTCMinutes();
    let Seconds = now.getUTCSeconds();
    let ms = now.getUTCMilliseconds();
    let FDay = `${Day}`;
    let FMonth = `${Month}`;
    let FYear = `${Year}`;
    let FHour = `${Hour}`;
    let FMinute = `${Minute}`;
    let FSeconds = `${Seconds}`;
    let Fms = `${ms}`;
    if (Day < 10)
        FDay = `0${Day}`;
    if (Month < 10)
        FMonth = `0${Month}`;
    if (Hour < 10)
        FHour = `0${Hour}`;
    if (Minute < 10)
        FMinute = `0${Minute}`;
    if (Seconds < 10)
        FSeconds = `0${Seconds}`;
    if (ms < 10)
        Fms = `00${ms}`;
    if (ms < 100)
        Fms = `0${ms}`;
    const DateFormated = `UTC ${FMonth}/${FDay}/${FYear} - ${FHour}:${FMinute}:${FSeconds},${Fms}`;
    return DateFormated;
}
function createColorLine_noWithHour(label, content, color, type, consoleType) {
    const Clabel = "\x1b[1;30m" + label + "\x1b[0m";
    const Ccontent = "\x1b[1;37m" + content + "\x1b[0m";
    const Cstate = "\x1b[0;37m[\x1b[0m \x1b[" + color + "m" + type + "\x1b[0m \x1b[0;37m]\x1b[0m";
    const Ctext = Cstate + " " + Clabel + " " + Ccontent;
    console[consoleType](Ctext);
}
function createColorLine_withHour(label, content, color, type, consoleType) {
    const Clabel = "\x1b[1;30m" + label + "\x1b[0m";
    const Ccontent = "\x1b[1;37m" + content + "\x1b[0m";
    const Cstate = "\x1b[0;37m[\x1b[0m \x1b[" + color + "m" + type + "\x1b[0m \x1b[0;37m]\x1b[0m";
    const Cdate = "\x1b[0;37m[\x1b[0m \x1b[1;35m" + getUTCDate() + "\x1b[0m \x1b[0;37m]\x1b[0m";
    const Ctext = Cdate + " " + Cstate + " " + Clabel + " " + Ccontent;
    console[consoleType](Ctext);
}
function ok_noWithHour(label, content) {
    createColorLine_noWithHour(label, content, "1;32", "OK", "log");
}
function ok_withHour(label, content) {
    createColorLine_withHour(label, content, "1;32", "OK", "log");
}
function error_noWithHour(label, content) {
    createColorLine_noWithHour(label, content, "1;31", "ERROR", "error");
}
function error_withHour(label, content) {
    createColorLine_withHour(label, content, "1;31", "ERROR", "error");
}
function warning_noWithHour(label, content) {
    createColorLine_noWithHour(label, content, "1;33", "WARNING", "warn");
}
function warning_withHour(label, content) {
    createColorLine_withHour(label, content, "1;33", "WARNING", "warn");
}
function info_noWithHour(label, content) {
    createColorLine_noWithHour(label, content, "1;36", "INFO", "info");
}
function info_withHour(label, content) {
    createColorLine_withHour(label, content, "1;36", "INFO", "info");
}
const obj = {
    ok: {
        noWithHour: ok_noWithHour,
        withHour: ok_withHour
    },
    error: {
        noWithHour: error_noWithHour,
        withHour: error_withHour
    },
    warning: {
        noWithHour: warning_noWithHour,
        withHour: warning_withHour
    },
    info: {
        noWithHour: info_noWithHour,
        withHour: info_withHour
    }
};
exports.default = obj;
