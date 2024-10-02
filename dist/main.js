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
exports.config = void 0;
exports.hasBypass = hasBypass;
const config = require("../config/bot.json");
exports.config = config;
const FarbeLog_1 = __importDefault(require("./functions/FarbeLog"));
const discord_js_1 = require("discord.js");
const database_1 = __importDefault(require("./functions/database"));
const commands_1 = __importDefault(require("./commands/commands"));
const Bot = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildModeration,
        discord_js_1.GatewayIntentBits.GuildEmojisAndStickers,
        discord_js_1.GatewayIntentBits.GuildIntegrations,
        discord_js_1.GatewayIntentBits.GuildWebhooks,
        discord_js_1.GatewayIntentBits.GuildInvites,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
        discord_js_1.GatewayIntentBits.GuildPresences,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
        discord_js_1.GatewayIntentBits.GuildMessageTyping,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.DirectMessageReactions,
        discord_js_1.GatewayIntentBits.DirectMessageTyping,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildScheduledEvents,
        discord_js_1.GatewayIntentBits.AutoModerationConfiguration,
        discord_js_1.GatewayIntentBits.AutoModerationExecution
    ]
});
function hasBypass(msg) {
    for (let i = 0; i < config.bypassRolesId.length; i++) {
        if (msg.member.roles.cache.has(config.bypassRolesId[i]))
            return 1;
    }
    return 0;
}
Bot.login(config.token);
Bot.on('ready', () => {
    var _a;
    FarbeLog_1.default.ok("logged", (_a = Bot.user) === null || _a === void 0 ? void 0 : _a.tag);
});
database_1.default.inicialize();
Bot.on('messageCreate', (msg) => __awaiter(void 0, void 0, void 0, function* () {
    commands_1.default.init(msg, Bot);
}));
Bot.on('rateLimit', (info) => {
    FarbeLog_1.default.error("client", `rate limit timeout: ${info.timeout}ms | limit: ${info.limit} | method: ${info.method} | path: ${info.path}`);
});
Bot.on("error", (error) => {
    FarbeLog_1.default.error("client", "error with Bot Client:\n" + error);
});
process.on('uncaughtException', (error) => {
    FarbeLog_1.default.error("process", `${error.name}:\x1b[0m ${error.message}`);
});
FarbeLog_1.default.ok("loaded", "main.ts");
