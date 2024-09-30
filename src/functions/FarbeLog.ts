import fs from "fs";
import { config } from "../main"

const logFilePath = config.logPath;
const offset = config.UTCOffset;

fs.appendFileSync(logFilePath, "\n\n------ log start ------\n");

function getUTCDate(): string {
    const now = new Date();

    now.setUTCHours(now.getUTCHours() + offset);
    
    const Day = `${now.getUTCDate()}`.padStart(2, '0');
    const Month = `${now.getUTCMonth() + 1}`.padStart(2, '0');
    const Year = now.getUTCFullYear();
    const Hour = `${now.getUTCHours()}`.padStart(2, '0');
    const Minute = `${now.getUTCMinutes()}`.padStart(2, '0');
    const Seconds = `${now.getUTCSeconds()}`.padStart(2, '0');
    const ms = `${now.getUTCMilliseconds()}`.padStart(3, '0');
    
    const timezone = offset >= 0 ? `UTC+${offset}` : `UTC${offset}`;
    
    return `${timezone} ${Month}/${Day}/${Year} - ${Hour}:${Minute}:${Seconds},${ms}`;
}


function logMessage(label: string, content: string, color: string, type: string, consoleType: string, showHour: boolean) {
    const Clabel = `\x1b[1;30m${label}\x1b[0m`;
    const Ccontent = `\x1b[1;37m${content}\x1b[0m`;
    const Cstate = `\x1b[0;37m[\x1b[0m \x1b[${color}m${type}\x1b[0m \x1b[0;37m]\x1b[0m`;
    const Cdate = showHour ? `\x1b[0;37m[\x1b[0m \x1b[1;35m${getUTCDate()}\x1b[0m \x1b[0;37m]\x1b[0m ` : "";
    const Ctext = `${Cdate}${Cstate} ${Clabel} ${Ccontent}`;

    const state = `[ ${type} ]`;
    const date = showHour ? `[ ${getUTCDate()} ] ` : "";
    const text = `${date}${state} ${label} ${content}`;
    
    console[consoleType](Ctext);
    fs.appendFileSync(logFilePath, text + '\n');
}

const obj = {
    ok: (label: string, content: string, hour: boolean = true) => logMessage(label, content, "1;32", "OK", "log", hour),
    error: (label: string, content: string, hour: boolean = true) => logMessage(label, content, "1;31", "ERROR", "error", hour),
    warning: (label: string, content: string, hour: boolean = true) => logMessage(label, content, "1;33", "WARNING", "warn", hour),
    info: (label: string, content: string, hour: boolean = true) => logMessage(label, content, "1;36", "INFO", "info", hour)
};

obj.info("loading", "main.ts");

export default obj;