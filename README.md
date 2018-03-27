# drooM.js
The newest and smoothest framework for a Discord bot.
# Information
This framework is created to make coding discord bots go way faster and easier. It has made a `help` and an `eval` command for you, so you don't have to (you can disable these commands). It also has a very useful command registry, it creates a file with a basic template for you if the command file doesn't exist. This is very useful for starters. Besides, it has an event handler too. It also creates a file with a basic template for you.
# How to use this framework
In order to install this framework, you need to do the following:
<br>
1) Just type `npm install droom.js` in your console and you've installed drooM.js.
<br>
This framework requires 1 of these listed modules:
1. Eris
2. Discord.js
<br>
If you have both modules, the bot is gonna take Eris. So make sure you uninstall the module you don't wanna use. To install Discord.js, type in your console: `npm i discord.js --save`. To install Eris, type in your console: `npm i eris --no-optional`. If you want voice support for Eris, you need to remove the `--no-optional` flag.
<br>
Now, of course, we wanna use it.
<br>
Firstly, we need to require the framework, in order to be able to use it. Your code should look like this: `const drooM = require("droom.js");`.
<br>
Secondly, we need to create an instance of the framework, like so: `const client = new drooM("TOKEN", "OPTIONS", "COMMANDOPTIONS");`.
<br>
Replace TOKEN with the token of your bot, OPTIONS with the startup options for eris, which can be found on the documents page of eris, and COMMANDOPTIONS with the options for the commands. More information about this can be found in `DOCUMENTATION.md`.
<br>
Thirdly, the registry needs to register where you store your commands and event handler. You can do this like so:<br>
`const path = require("path");<br>
client.register(path.join(__dirname, "COMMANDFOLDER"), path.join(__dirname, "EVENTHANDLERFOLDER"));`.
<br>
Another module? Don't worry. This module has come with NodeJS. This function registers the folders to store the commands and event handlers in.
<br>
Next, you need to add a command. You do that like so: `client.addCommand("LABEL", "OPTIONS");`.
<br>
Let's make a ping pong command to show you how this works. `client.addCommand("ping");`.
<br>
This will create a new file called "**ping.js**". The content of this file will look like this:
<br>
`const drooM = require("droom.js");<br>
function ping(droom, message, args) {<br>
  const client = drooM._client;<br>
}<br>
module.exports.run = ping;<br>
module.exports.path = __dirname + "/ping.js";`.
<br>
Simply add between the curly brackets: `droom.send(message.channel.id, "Pong!");`.<br>
<br>
This will work after you restart the bot.
<br>
Replace OPTIONS with optional options for your command. More information about this can be found in my discord server.
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
