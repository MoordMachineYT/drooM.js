"use strict";
const Registry = require("./Registry.js");
const fs = require("fs");
const path = require("path");

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
  * @arg {Array<String>} [commandOptions.prefix=["@mention "]] The prefix for the bot
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
      helpCommandAliases: ["help"],
      prefix: ["@mention "],
      ignoreBots: true,
      ignoreSelf: true,
      ready: "The bot has started and is ready for use"
    };

    this.commands = {};
    this.commandAliases = {};

    this.commandAliases.push(this.commandOptions.helpCommandAliases);

    if (!~this.commandOptions.helpCommandAliases.indexOf("help")) this.commandOptions.helpCommandAliases.push("help");

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
      if (~this.commandOptions.prefix.indexOf("@mention")) {
        this.commandOptions.prefix.forEach(item => {
          item = item.replace("@mention", this._client.user.mention);
        })
      }
      if (this.commandOptions.ready) {
        console.log(this.commandOptions.ready);
      } else return;
    });
    if (this.commandOptions.helpCommand) {
      this.commands[label] = {
        aliases: this.commandOptions.helpCommandAliases,
        args: false,
        desciption: "Shows this list",
        fullDescription: "Shows a list of commands and information on them.",

      }
      this._client.on("messageCreate", message => {
        this.ms = message.timestamp;
        this.hour = ~~(this.ms / 36e5 % 24);
        this.min = ~~(this.ms / 6e4 % 60);
        this.mer;
        if (this.hour < 12) {
          this.mer = "AM";
        } else if (this.hour === 12) {
          this.mer = "PM";
        } else if (this.hour === 0) {
          this.hour += 12;
          this.mer = "AM";
        } else {
          this.hour -= 12;
          this.mer = "PM";
        }
        this.time = this.hour.toString() + ":" + this.min.toString() + " " + this.mer + "UTC";
        // const hour = ms / 36e5 % 24, min = ms / 6e4 % 60, sec = ms % 1e3;
        this.msg = message.content.split(" ");
        this.req = false;
        this.commandOptions.prefix.forEach(pref => {
          if (this.msg[0].startsWith(pref)) {
            this.req = true;
            this.pref = pref.length;
          }
        });
        if (!this.req) return;
        this.req = false;
        this.msg[0] = this.msg[0].slice(this.pref);
        this.args = this.msg.slice(1).join(" ");
          for (var i = 0; i < this.helpCommandAliases.length; i++) {
            if (this.helpCommandAliases.indexOf(this.msg[2].toLowerCase())) {
              this.req = true;
            }
            if (this.req) {
              if (!this.args) {
                this.embedNames = [];
                this.embedValues = [];
                this.embedFields = [];
                for (var j in this.commands) {
                  this.embedNames.push(j);
                  this.embedValues.push(this.commands[j].description + ". Usage: `" + this.commands[j].usage + "`.");
                }
                for (var j = 0; j < this.embedNames.length; j++) {
                  this.embedFields.push({
                    name: this.embedNames[j],
                    value: this.embedValues[j],
                    inline: false
                  });
                }
                this._client.getDMChannel(message.author.id).then(msg => msg.createMessage({
                  embed: {
                    title: "Help command",
                    description: this.commandOptions.description,
                    author: {
                      name: this.commandOptions.name || this._client.user.username,
                      icon_url: this._client.user.avatarURL
                    },
                    color: 0x6F9678,
                    fields: this.embedFields,
                    footer: {
                      text: this.time
                    }
                  }
                }));
                break;
              } else {
                for (var i in this.commands) {
                  if (this.msg[1] === i || this.commands[i].aliases.includes(this.msg[1])) {
                    message.channel.createMessage({
                      embed: {
                        title: "Help command",
                        description: "Requested by " + message.author.username,
                        author: {
                          name: this.commandOptions.name || this._client.user.username,
                          icon_url: this._client.user.avatarURL
                        },
                        color: 0x6F9678,
                        fields: [{
                          name: i,
                          value: this.commands[i].fullDescription + ". Aliases: `" + this.commands[i].aliases.join("`, `") + "`. Usage: `" + this.commands[i].usage + "`.",
                          inline: true
                        }],
                        footer: {
                          text: this.time
                        }
                      }
                    });
                    break;
                  }
                }
              }
            } else continue;
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
    this.options = {
      args: true,
      aliases: null,
      description: "No description",
      fullDescription: "No description",
      guild: true,
      dm: true,
      usage: this.options.args ? `\`${this.commandOptions.prefix[0] + label} <args>\`` : this.commandOptions.prefix[0] + label;
      invalidUsage: "You are using this command incorrectly. Try `" + this.commandOptions.prefix[0] + " " + label + "` for more information on this command.",
    }
    if (typeof options === "object") {
      for (var i of Object.keys(options)) {
        this.options[i] = options[i];
      }
    }
    if (this.aliases !== null) {
      this.commandAliases.forEach((item, index) => {
        if (this.commandAliases[item]) {
          throw new Error("already registered a command with label " + item + ", index " + index + "from commandAliases");
        } else this.commandAliases[item] = "used";
      });
    }
    Registry.registerCommand(label, this.options);
    this.commands[label] = {
      description: this.options.description,
      fullDescription: this.options.fullDescription,
      aliases: this.options.aliases || "No aliases",
      usage: this.options.usage,
      prefix: this.commandOptions.prefix
    };
  }
  launch() {
    this._client.connect();
  }
  exit(options) {
    this._client.disconnect(options || {});
  }
}

module.exports = Client;
