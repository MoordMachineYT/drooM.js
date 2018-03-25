"use strict";
const Registry = require("./Registry.js");
const fs = require("fs");
const path = require("path");
const { permissionCheck, commandCheck } = require("./Command.js");

/**
* Represents the main drooM.js client
* @prop {Class} cl The eris client to be used
* @prop {Object} [commandOptions] The additional options for commands
*/
class Client {
  /**
  * @arg {Object} _client The eris client to be used
  * @arg {Object} [commandOptions] The additional options for commands
  * @arg {String} [commandOptions.description="A bot built with the drooM.js framework"] The bot's description
  * @arg {String?} [commandOptions.name] The name of the bot
  * @arg {String?} [commandOptions.owner] The owner of the bot
  * @arg {Boolean} [commandOptions.helpCommand] The default help command to be enabled or disabled
  * @arg {Boolean} [commandOptions.evalCommand] The default eval command to be enabled or disabled
  * @arg {Object} [commandOptions.messageLimit=50] The maximum cached channel messages
  * @arg {Array<String>} [commandOptions.prefix=["!"]] The prefix for the bot
  * @arg {Boolean} [commandOptions.ignoreBots] Whether to respond to other bots or not
  * @arg {Boolean} [commandOptions.ignoreSelf] Whether to respond to the messages sent by this client or not
  * @arg {String} [commandOptions.ready="The bot has started and is ready for use"] Posts this in the console when the bot is ready for use
  */
  constructor(cl, commandOptions, lib, token) {
    this._client = cl;
    this.commandOptions = {
      description: "A bot built with the drooM.js framework",
      name: null,
      owner: null,
      helpCommand: true,
      evalCommand: true,
      messageLimit: 50,
      prefix: ["!"],
      ignoreBots: true,
      ignoreSelf: true,
      ready: "The bot has started and is ready for use"
    };
    this.lib = lib;
    if (this.lib === "discord.js") this.token = token;

    this.commands = {};
    this.commandAliases = {};
    this.handling = [];
    this.caches = 0;
    this.messages = {};

    if (typeof commandOptions === "object") {
      for (var i of Object.keys(commandOptions)) {
        this.commandOptions[i] = commandOptions[i];
      }
    }

    if (typeof this.commandOptions.messageLimit !== "number") this.commandOptions.messageLimit = 50;
    if (this.commandOptions.messageLimit === 0) this.commandOptions.messageLimit++;

    if (!Array.isArray(this.commandOptions.owner)) this.commandOptions.owner = [this.commandOptions.owner];
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
        aliases: "No aliases",
        args: false,
        description: "Shows this list",
        fullDescription: "Shows a list of commands and information on them",
        usage: "<>help <command>",
        req: {
          permissions: [],
          userIDs: [],
          usernames: [],
          roleIDs: [],
          rolenames: []
        },
        run: (drooM, message, args) => {
          drooM.time = new Date(message.timestamp || message.createdTimestamp).toLocaleString("en-US", { hour: "numeric", minute: "numeric", second: "numeric" });
          drooM.args = args.split(" ");
          if (!drooM.args[0]) {
            drooM.embedNames = [];
            drooM.embedFields = [];
            drooM.embedValues = [];
            for (var i in drooM.commands) {
              drooM.embedNames.push(i);
              drooM.embedValues.push(drooM.commands[i].description);
            }
            for (var i = 0; i < drooM.embedNames.length; i++) {
              drooM.embedFields.push({
                name: drooM.embedNames[i],
                value: drooM.embedValues[i],
                inline: true
              });
            }
            drooM.dm(message.author.id, {
              embed: {
                title: "Help command",
                description: drooM.commandOptions.description,
                thumbnail: {
                  url: drooM._client.user.avatarURL
                },
                author: {
                  name: drooM._client.user.username,
                  icon_url: drooM._client.user.avatarURL
                },
                color: 0x497C2C,
                fields: drooM.embedFields,
                footer: {
                  text: drooM.time
                }
              }
            });
          } else {
            var command = drooM.commandAliases[drooM.args[0].toLowerCase()] || drooM.args[0].toLowerCase();
            if (!drooM.commands[command]) return drooM.send(message.channel.id, "Command not found.");
            drooM.send(message.channel.id, {
              embed: {
                thumbnail: {
                  url: drooM._client.user.avatarURL
                },
                fields: [{
                  name: command,
                  value: drooM.commands[command].fullDescription + ".\n\nAliases: '" + (Array.isArray(drooM.commands[command].aliases) ? drooM.commands[command].aliases.join("', '") : "No aliases") + "'.\nUsage: \`" + drooM.commands[command].usage + "\`.",
                  inline: true
                }],
                footer: {
                  text: drooM.time
                },
                color: 0x497C2C
              }
            });
          }
        }
      }
    }
    if (this.commandOptions.evalCommand) {
      if (typeof this.commandOptions.owner === "string") {
        this.commandOptions.owner = [this.commandOptions.owner];
      } else if (Array.isArray(this.commandOptions.owner)) {
        this.commandOptions.owner.forEach((id, i) => {
          if (typeof id !== "string") throw new TypeError(`client.commandOptions.owner must be an array of strings or a string (index ${i})`);
        });
      }
      this.commands.eval = {
        aliases: "No aliases",
        args: true,
        description: "Evaluates JavaScript code",
        usage: "<>eval <input>",
        req: {
          userIDs: this.commandOptions.owner[0] ? this.commandOptions.owner : "No access to anyone",
          permissions: [],
          usernames: [],
          roleIDs: [],
          rolenames: []
        },
        run: (drooM, message, args) => {
          const client = this._client;
          if (args.startsWith("nooutput")) {
            const ev = args.split(/\s/).slice(1).join(" ");
            try {
              eval(ev);
            } catch(err) {
              this.send(message.channel.id, {
                embed: {
                  fields: [{
                    name: "Input",
                    value: ev,
                    inline: false
                  }, {
                    name: "Error",
                    value: err,
                    inline: false
                  }],
                  footer: {
                    text: new Date(message.timestamp || message.createdTimestamp).toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
                  }
                }
              });
            }
          } else {
            try {
              const evaled = eval(args);
              this.send(message.channel.id, {
                embed: {
                  fields: [{
                    name: "Input",
                    value: `\`\`\`${args}\`\`\``,
                    inline: false
                  }, {
                    name: "Output",
                    value: `\`\`\`${evaled}\`\`\``,
                    inline: false
                  }],
                  footer: {
                    text: new Date(message.timestamp || message.createdTimestamp).toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
                  }
                }
              });
            } catch(err) {
              this.send(message.channel.id, {
                embed: {
                  fields: [{
                    name: "Input",
                    value: `\`\`\`${args}\`\`\``,
                    inline: false
                  }, {
                    name: "Error",
                    value: `\`\`\`${err}\n\`\`\``,
                    inline: false
                  }],
                  footer: {
                    text: new Date(message.timestamp || message.createdTimestamp).toLocaleString("en-US", { hour: "numeric", minute: "numeric" })
                  }
                }
              });
            }
          }
        }
      }
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
  addCommand(label, options, excPath) {
    if (typeof label !== "string") throw new TypeError("incorrect label format (label must be a string)");
    if (typeof excPath !== "string") excPath = null;
    if (label.includes(" ")) throw new Error("label may not include spaces: '" + label + "'");
    if (this.commands[label] || this.commandAliases[label]) throw new Error("you already registered a command with label: '" + label + "'");
    this.args = options.args || false;
    this.options = {
      args: true,
      aliases: null,
      description: "No description",
      fullDescription: null,
      guild: true,
      dm: true,
      req: {},
      usage: this.args ? this.commandOptions.prefix[0] + label +  " <args>" : this.commandOptions.prefix[0] + label,
      invalidUsage: "You are using this command incorrectly. Try `" + this.commandOptions.prefix[0] + "help " + label + "` for more information on this command.",
      invalidPermission: "You don't have permission to use this command."
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
    this.run = this.Registry.registerCommand(label, this.options, this.getPrefix(), excPath);
    this.commands[label] = {
      description: this.options.description,
      fullDescription: this.options.fullDescription,
      aliases: this.options.aliases || "No aliases",
      usage: this.options.usage,
      run: this.run.run,
      path: this.run.path,
      guild: this.options.guild,
      dm: this.options.dm,
      args: this.options.args,
      invalidUsage: this.options.invalidUsage,
      req: this.options.req,
      invalidPermission: this.options.invalidPermission
    };
  }
  delCommand(label, time) {
    label = label.toLowerCase();
    if (typeof time !== "number") time = null;
    if (!time) {
      if (!this.commands[label]) return;
      delete this.commands[label];
      for (var i in this.commandAliases) {
        if (this.commandAliases[i] === label) {
          delete this.commandAliases[i];
        }
      }
    } else {
      var command = this.commandAliases[label] || label;
      if (!this.commands[command]) return;
      var props = this.commands[command];
      delete this.commands[command];
      var aliases = [];
      for (var i in this.commandAliases) {
        if (this.commandAliases[i] === command) {
          aliases.push(i);
          delete this.commandAliases[i];
        }
      }
      setTimeout(() => {
        this.commands[command] = props;
        aliases.forEach(a => this.commandAliases[a] = command);
      }, time);
    }
  }
  refresh(label) {
    var time = new Date();
    if (!label) {
      for (var i in this.commands) {
        if (!this.commands[i].path) continue;
        this.caches++;
        const command = fs.readFileSync(this.commands[i].path, "utf8");
        fs.writeFileSync(path.join(__dirname, `../cache/${this.caches}.js`), command);
        this.commands[i].run = require(path.join(__dirname, `../cache/${this.caches}.js`)).run;
      }
    } else {
      if (!this.commands[label]) return "Command not found.";
      if (!this.commands[label].path) return "This command isn't refreshable.";
      this.caches++;
      const command = fs.readFileSync(this.commands[label].path, "utf8");
      fs.writeFileSync(path.join(__dirname, `../cache/${this.caches}.js`));
      this.commands[i].run = require(path.join(__dirname, `../cache/${this.caches}.js`)).run;
    }
    delete this.messages;
    this.messages = {};
    time = new Date() - time;
    return "Completed reload in " + time.toString() + "ms.";
  }
  launch() {
    fs.mkdir(path.join(__dirname, "../cache"), err => {
      if (err) {
        fs.rmdir(path.join(__dirname, "../cache"), async (err, result) => {
          if (err) {
            const files = await fs.readdirSync(path.join(__dirname, "../cache"));
            files.forEach(f => {
              fs.unlinkSync(path.join(__dirname, `../cache/${f}`));
            });
          } else fs.mkdirSync(path.join(__dirname, "../cache"));
        });
      }
    });
    this._client.on("message", message => { this._client.emit("messageCreate", message); });
    this._client.on("messageCreate", message => {
      this.ping = new Date();
      this.ping -= message.timestamp || message.createdTimestamp;
      if (this.commandOptions.ignoreSelf) {
        if (message.author.id === this._client.user.id) return;
      }
      if (this.commandOptions.ignoreBots) {
        if (message.author.bot) return this.storeMessage(message);
      }
      const length = commandCheck(message, this.commandOptions.prefix);
      if (!length) return this.storeMessage(message);
      var msg = message.content.toLowerCase().slice(length).split(" ");
      var command = this.commandAliases[msg[0]] || msg[0];
      if (!this.commands[command]) return;
      command = this.commands[command];
      var args = msg.slice(1).join(" ");
      if (command.args && !args) return () => {
        this.send(message.channel.id, command.invalidUsage);
        this.storeMessage(message);
      };
      var req = permissionCheck(command, message, this.lib);
      if (req === null) return this.storeMessage(message);
      if (!req) return () => {
        this.send(message.channel.id, command.invalidPermission);
        this.storeMessage(message);
      };
      command.run(this, message, args);
      this.storeMessage(message);
    });
    switch (this.lib) {
      case "eris":
        this._client.connect();
        break;
      case "discord.js":
        this._client.login(this.token);
        break;
    }
  }
  exit(options) {
    switch (this.lib) {
      case "eris":
        this._client.disconnect(options || null);
        break;
      case "discord.js":
        process.exit();
    }
  }
  register(commandPath, eventPath) {
    this.Registry = new Registry(commandPath, eventPath);
    return this.Registry;
  }
  getPrefix() {
    return this.commandOptions.prefix.join("\", \"");
  }
  dm(userid, message, additional) {
    switch (this.lib) {
      case "eris":
        this._client.getDMChannel(userid).then(msg => msg.createMessage(message));
      break;
      case "discord.js":
        this._client.users.get(userid).send(message, additional);
      break;
    }
  }
  send(channel, message, additional) {
    switch (this.lib) {
      case "eris":
        this._client.createMessage(channel, message);
        break;
      case "discord.js":
        this._client.channels.get(channel).send(message, additional);
    }
  }
  handleEvents(item) {
    if (!Array.isArray(item)) throw new TypeError("item must be an array");
    item.forEach(t => {
      if (~this.handling.indexOf(t)) throw new Error("already handling event " + t);
    });
    var t = this.Registry.HandleEvents(item);
    item.forEach((ev, i) => {
      this._client.on(ev, (arg1, arg2, arg3) => {
        this.handling.push(ev);
        return t[i](this, arg1, arg2, arg3);
      });
    });
  }
  setPrefix(prefix) {
    if (!Array.isArray(prefix)) prefix = [prefix];
    prefix.forEach(pref => {
      if (pref.includes(" ")) throw new Error("prefix may not include spaces");
    });
    this.commandOptions.prefix = prefix;
  }
  storeMessage(message) {
    if (!this.messages[message.channel.id]) this.messages[message.channel.id] = [];
    if (this.messages[message.channel.id].length >= this.commandOptions.messageLimit) this.messages[message.channel.id].pop();
    this.messages[message.channel.id].unshift(message);
  }
}

module.exports = Client;
