# CelestialBot

## Deploy

Use the command `npm install --production` to install dependencies.
Remove the underscore of `_config` and `_messages` directories, and change the `config/bot.json` file.
Run bot with `./run.sh`.

- You can see last logs in `botlog.log` file

## Development

Use the command `npm install`to install dependencies.
Copy the directories `_config` and `_messages` and remove the underscore of them, and change the `config/bot.json` file to your debug client.
Compile bot with `npx tsc` and run with `node dist/main.js`.
