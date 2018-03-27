# drooM.js
The newest and smoothest framework for a Discord bot.

# Information
This framework is created to make coding Discord bots go much faster and easier. It has made a `help` and an `eval` command for you, so you don't have to (you can disable these commands). It also has a very useful command registry, it creates a file with a basic template for you if the command file doesn't exist. This is very useful for starters. IT also, it has an event handler too. It also creates a file with a basic template for you.

# How to use this framework
1. Install drooM.js by running `npm i droom.js`.
2. Install either <a href="https://github.com/abalabahaha/eris">Eris</a> by using `npm i eris --no-optional` (remove `--no-optional` if you do not require voice support) or <a href="https://github.com/discordjs/discord.js">Discord.js</a> by using `npm i discord.js --save`.
<br><br>

If you have both modules, the bot is going to use Eris by default, so make sure you uninstall the module you don't want to use.
<br><br>

Now, of course, we wanna use it.
<br><br>

Firstly, we need to require the framework, in order to be able to use it. Your code should look like this:<br>
`const droom = require("droom.js");`.
<br><br>

Secondly, we need to create an instance of the framework, like so:<br>
`const client = new drooM("TOKEN", "OPTIONS", "COMMANDOPTIONS");`.
<br><br>

Replace TOKEN with the token of your bot, OPTIONS with the startup options for Eris, which can be found in Eris' documentation, and COMMANDOPTIONS with the options for the commands. More information about this can be found in `DOCUMENTATION.md`.
<br><br>

Thirdly, the registry needs to register where you store your commands and event handler. You can do this like so:<br>
`const path = require("path");`<br>
`client.register(path.join(__dirname, "COMMANDFOLDER"), path.join(__dirname, "EVENTHANDLERFOLDER"));`.
<br><br>

Another module? Don't worry. This module has come with NodeJS. This function registers the folders to store the commands and event handlers in.
<br><br>

Next, you need to add a command. You do that like so: `client.addCommand("LABEL", "OPTIONS");`.
<br>
Let's make a ping pong command to show you how this works. `client.addCommand("ping");`.
<br>
This will create a new file called "**ping.js**". The content of this file will look like this:
<br>
`const drooM = require("droom.js");`<br>
`function ping(droom, message, args) {`<br>
`  const client = droom._client;`<br>
`}`<br>
`module.exports.run = ping;`<br>
`module.exports.path = __dirname + "/ping.js";`.
<br>
Simply add between the curly brackets: `droom.send(message.channel.id, "Pong!");`.<br>
<br>
This will work after you restart the bot.
<br>
Replace OPTIONS with optional options for your command. More information about this can be found in my Discord server.
<br>
Finally, the bot is ready to start. Go back to the first file and start it like so: `client.launch();`.
<br>
Congratulations! You made your first bot using drooM.js!

# Suggestions

Please contact one of the contributors on discord, and send him a private message.

# Contributors

This framework has been made by MoordMachineYT. You can contact him on discord: https://discord.gg/eM4BBvu

# Questions

Please refer to the discord server: https://discord.gg/eM4BBvu

# Issues

If there are any issues, please contact one of the contributors on discord, and send him a private message. He'll try to solve them ASAP for you.
