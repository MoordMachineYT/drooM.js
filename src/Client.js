"use strict";
const Registry = require("./Registry.js");
const fs = require("fs");
const path = require("path");
const { permissionCheck } = require("./Command.js");

/**
* Represents the main drooM.js client
* @prop {Class} cl The eris client to be used
* @prop {Object} [commandOptions] The additional options for commands
*/
class Client {
  /**
  * @arg {Class} _client The eris client to be used
  * @arg {Object} [commandOptions] The additional options for commands
  * @arg {String} [commandOptions.description="A bot built with the drooM.js framework"] The bot's description
  * @arg {String} [commandOptions.name=null] The name of the bot
  * @arg {String} [commandOptions.owner="An unknown user"] The owner of the bot
  * @arg {Boolean} [commandOptions.helpCommand=true] The default help command to be enabled or disabled
  * @arg {Array<String>} [commandOptions.helpCommandAliases=["help"]] The aliases for the help command if used
  * @arg {Array<String>} [commandOptions.prefix=["!"]] The prefix for the bot
  * @arg {Boolean} [commandOptions.ignoreBots=true] Whether to respond to other bots or not
  * @arg {Boolean} [commandOptions.ignoreSelf=true] Whether to respond to the messages sent by this client or not
  * @arg {String} [commandOptions.ready="The bot has started and is ready for use"] Posts this in the console when the bot is ready for use
  */
  constructor(cl, commandOptions) {
    this._client = cl;
    this.commandOptions = {
      description: "A bot built with the drooM.js framework",
      name: null,
      owner: "An unknown user",
      helpCommand: true,
      prefix: ["!"],
      ignoreBots: true,
      ignoreSelf: true,
      ready: "The bot has started and is ready for use"
    };

    this.commands = {};
    this.commandAliases = {};
<<<<<<< HEAD
    this.handling = [];
=======

    for (var i of Object.keys(this.commandOptions.helpCommandAliases)) {
      this.commandAliases[i] = 1;
    }

    if (!~this.commandOptions.helpCommandAliases.indexOf("help")) this.commandOptions.helpCommandAliases.push("help");
>>>>>>> cd0eb17a5c08d782ac52045284daa427689bb6af

    if (typeof commandOptions === "object") {
      for (var i of Object.keys(commandOptions)) {
        this.commandOptions[i] = commandOptions[i];
      }
    }
    if (Array.isArray(this.commandOptions.prefix)) {
      this.commandOptions.prefix.forEach((item, index) => {
        if (typeof item !== "string") {
          throw new TypeError("prefix type must be an array of strings , index = " + index);
        }
      });
    } else throw new TypeError("prefix type must be an array of strings");
    this._client.on("ready", () => {
      if (this.commandOptions.ready) {
        console.log(this.commandOptions.ready);
      }
    });

    if (this.commandOptions.helpCommand) {
      this.commands.help = {
<<<<<<< HEAD
        aliases: "No aliases",
=======
        aliases: this.commandOptions.helpCommandAliases,
>>>>>>> cd0eb17a5c08d782ac52045284daa427689bb6af
        args: false,
        description: "Shows this list",
        fullDescription: "Shows a list of commands and information on them",
        usage: "<>help <command>"
      }
      this._client.on("messageCreate", message => {
        this.time = new Date(message.timestamp).toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });
        this.msg = message.content.split(" ");
        this.prefix = this.commandOptions.prefix.filter(pref => this.msg[0].startsWith(pref));
        if (!this.prefix.length) return;
        this.req = false;
        this.msg[0] = this.msg[0].slice(this.prefix[0].length);
        if (!this.msg[0]) return;
        if (this.msg[0].toLowerCase() !== "help") return;
        this.args = this.msg.slice(1);
        if (!this.args[0]) {
          this.embedNames = [];
          this.embedFields = [];
          this.embedValues = [];
          for (var i in this.commands) {
            this.embedNames.push(i);
            this.embedValues.push(this.commands[i].description + ". Aliases: '" + (Array.isArray(this.commands[i].aliases) ? this.commands[i].aliases.join("', '") : "No aliases") + "'.");
          }
          for (var i = 0; i < this.embedNames.length; i++) {
            this.embedFields.push({
              name: this.embedNames[i],
              value: this.embedValues[i],
              inline: true
            });
          }
          this.dm(message.author.id, {
            embed: {
              title: "Help command",
              description: this.commandOptions.description,
              thumbnail: {
                url: this._client.user.avatarURL
              },
              author: {
                name: this._client.user.username,
                icon_url: this._client.user.avatarURL
              },
              color: 0x497C2C,
              fields: this.embedFields,
              footer: {
                text: this.time
              }
            }
          });
        } else {
          var command = this.commandAliases[this.args[0].toLowerCase()] || this.args[0].toLowerCase();
          if (!this.commands[command]) return this.send(message.channel.id, "Command not found.");
          this.send(message.channel.id, {
            embed: {
              thumbnail: {
                url: this._client.user.avatarURL
              },
              fields: [{
                name: command,
                value: this.commands[command].fullDescription + ". Aliases: '" + (Array.isArray(this.commands[command].aliases) ? this.commands[command].aliases.join("', '") : "No aliases") + "'. Usage: \`" + this.commands[command].usage + "\`.",
                inline: true
              }],
              footer: {
                text: this.time
              },
              color: 0x497C2C
            }
          })
        }
      });
    }
  }
  /**
  * Adds the commands
  * @arg {String} label The label to call the command with
  * @arg {Object} [options] The command options
  * @arg {Boolean} [options.args=true] Whether arguments are required or not
  * @arg {Array<String>} [options.aliases=null] The aliases for the command
  * @arg {String} [options.description] The description to show in the help command
  * @arg {String} [options.fullDescription] The description to show in the command specific help command
  * @arg {Boolean} [options.guild] Whether the command should be handled in guilds or not
  * @arg {Boolean} [options.dm] Whether the command should be handled in private messages or not
  * @arg {String} [options.invalidUsage] The message to be sent if the command is used incorrectly
  */
  AddCommand(label, options) {
    if (typeof label !== "string") throw new TypeError("incorrect label format (label must be a string)")
    if (label.includes(" ")) throw new Error("label may not include spaces: '" + label + "'");
    if (this.commands[label] || this.commandAliases[label]) throw new Error("you already registered a command with label: '" + label + "'");
    this.args = options.args || false;
    this.options = {
      args: false,
      aliases: null,
      description: "No description",
      fullDescription: null,
      guild: true,
      dm: true,
<<<<<<< HEAD
      req: {},
      usage: this.args ? this.commandOptions.prefix[0] + label +  " <args>" : this.commandOptions.prefix[0] + label,
      invalidUsage: "You are using this command incorrectly. Try `" + this.commandOptions.prefix[0] + "help " + label + "` for more information on this command.",
      invalidPermission: "You don't have permission to use this command."
=======
      usage: this.options.args ? `\`${this.commandOptions.prefix[0] + label} <args>\`` : this.commandOptions.prefix[0] + label,
      invalidUsage: "You are using this command incorrectly. Try `" + this.commandOptions.prefix[0] + " " + label + "` for more information on this command."
>>>>>>> cd0eb17a5c08d782ac52045284daa427689bb6af
    }
    if (typeof options === "object") {
      for (var i of Object.keys(options)) {
        this.options[i] = options[i];
      }
    }
    if (!this.options.req.permissions) this.options.req.permissions = [];
    if (!this.options.req.roleIDs) this.options.req.roleIDs = [];
    if (!this.options.req.rolenames) this.options.req.rolenames = [];
    if (!this.options.req.userIDs) this.options.req.userIDs = [];
    if (!this.options.req.usernames) this.options.req.usernames = [];
    if (!this.options.fullDescription) this.options.fullDescription = this.options.description;
    if (typeof this.options.req !== "undefined" && typeof this.options.req !== "object") throw new Error("requirements must be an object or undefined (command " + label + ")");
    if (Array.isArray(this.options.aliases)) {
      this.options.aliases.forEach((item, index) => {
        if (typeof item !== "string") throw new TypeError("Aliases must be strings, item " + item + ", index " + index);
        item = item.toLowerCase();
        if (this.commandAliases[item] || this.commands[item]) {
          throw new Error("already registered a command with label " + item + ", index " + index + "from commandAliases");
        } else this.commandAliases[item] = label;
      });
    }
    this.run = this.Registry.registerCommand(label, this.options, this.getPrefix());
    this.commands[label] = {
      description: this.options.description,
      fullDescription: this.options.fullDescription,
      aliases: this.options.aliases || "No aliases",
      usage: this.options.usage,
      run: this.run.run,
      guild: this.options.guild,
      dm: this.options.dm,
      args: this.options.args,
      invalidUsage: this.options.invalidUsage,
      req: this.options.req,
      invalidPermission: this.options.invalidPermission
    };
  }
  launch() {
    this._client.on("messageCreate", message => {
      if (this.commandOptions.ignoreSelf) {
        if (message.author.id === this._client.user.id) return;
      }
      if (this.commandOptions.ignoreBots) {
        if (message.author.bot) return;
      }
      var msg = message.content.split(/\s/);
      var prefix = this.commandOptions.prefix.filter(pref => msg[0].startsWith(pref));
      if (!prefix[0]) return;
      msg[0] = msg[0].slice(prefix[0].length);
      if (!msg[0]) return;
      msg[0] = msg[0].toLowerCase();
      var command = this.commandAliases[msg[0]] || msg[0];
      if (command === "help") return;
      if (!this.commands[command]) return;
      command = this.commands[command];
      var args = message.content.split(/\s/).slice(1).join(" ");
      console.log(args);
      if (command.args) {
        if (!args) return this.send(message.channel.id, command.invalidUsage);
      }
      var req = permissionCheck(command, message);
      if (!req) return this.send(message.channel.id, command.invalidPermission);
      console.log(message.channel.id);
      return command.run(this._client, message, args);
    });
    this._client.connect();
  }
  exit(options) {
    this._client.disconnect(options || null);
  }
  Register(commandPath, eventPath) {
    this.Registry = new Registry(commandPath, eventPath);
    return this.Registry;
  }
  getPrefix() {
    return this.commandOptions.prefix.join("\", \"");
  }
  dm(userid, message) {
    this._client.getDMChannel(userid).then(msg => msg.createMessage(message));
  }
  send(channel, message) {
    this._client.createMessage(channel, message);
  }
  HandleEvents(item) {
    if (!Array.isArray(item)) throw new TypeError("item must be an array");
    item.forEach(t => {
      if (~this.handling.indexOf(t)) throw new Error("already handling event " + t);
    });
    var t = this.Registry.HandleEvents(item);
    for (var i = 0; i < item.length; i++) {
      this._client.on(item[i], t[i]);
    }
  }
  setPrefix(prefix) {
    this.commandOptions.prefix = prefix;
  }
}

module.exports = Client;
