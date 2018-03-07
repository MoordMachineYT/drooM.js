# drooM.js
The newest and smoothest framework for a discord bot. 
# Information
This framework is created to make coding discord bots go way faster and easier. It has made a `help` command for you, so you don't have to (you can disable this command). It also has a very useful command registry, it creates a file with a basic template for you if the command file doesn't exist. This is very useful for starters. Besides, it has an event handler too. It also creates a file with a basic template for you. 
# How to use this framework
In order to install this framework, you need to do the following:
1) Clone this project, copy a link to this project and type `git <link>` in the console. Make sure you are in the right directory and you have installed NodeJS. 

2) Just type `npm install droom.js` and you're ready to go!

This framework needs 1 module, eris. Type in your console: `npm install eris`.

Firstly, we need to require the framework, in order to be able to use it. Your code should look like this: `const drooM = require("droom.js");`

Secondly, we need to create an instance of the framework, like so: `const client = new drooM("TOKEN", "OPTIONS", "COMMANDOPTIONS");`

Replace TOKEN with the token of your bot, OPTIONS with the startup options for eris, which can be found on the documents page of eris, and COMMANDOPTIONS with the options for the commands. More information about this can be found in my discord server.

Thirdly, the registry needs to register where you store your commands and event handler. You can do this like so: `const path = require("path");
client.Register(path.join(__dirname, "COMMANDFOLDER"), path.join(__dirname, "EVENTHANDLERFOLDER"));`

Another module? Don't worry. This module has come with NodeJS. This function registers the folders to store the commands and event handlers in.

Next, you need to add a command. You do that like so: `client.addCommand("LABEL", "OPTIONS");`

Let's make a ping pong command to show you how this works. `client.addCommand("ping");`

This will create a new file called "ping.js". The content of this file will look like this: `function ping(client, message, args) {
}`

Simply add between the curly brackets: `message.channel.createMessage("Pong!");`

This will work after you restart the bot.

Replace OPTIONS with optional options for your command. More information about this can be found in my discord server.

Finally, the bot is ready to start. Do it like so: `client.launch();`

Congratulations! You made your first bot using drooM.js!

# Contributors

This framework has been made by MoordMachineYT. You can contact him on discord: https://discord.gg/eM4BBvu

# Questions

Please refer to the discord server: https://discord.gg/eM4BBvu
