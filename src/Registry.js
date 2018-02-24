"use strict";
const Client = require("./Client.js");
const Handler = require("./Handler.js");
const path = require("path");
const fs = require("fs");
/**
* Registers everything that's being added
* @prop {String} messageCreatePath The path for the commands
* @prop {String} eventHandlerPath The path for the events being handled (this may include "messageCreate")
*/
class Registry {
  /**
  * @arg {String} messageCreatePath The path for the commands
  * @arg {String} eventHandlerPath The path for the events being handled (this may include "messageCreate")
  */
  constructor(messageCreatePath, eventHandlerPath) {
    this.path = messageCreatePath;
    this.evp = eventHandlerPath;
    this.commands = {};
  }
  /**
  * Registers the commands
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
  registerCommand(label, options) {
    if (this.commands[label]) throw new Error("you already registered a command with label '" + label + "'");
    try {
      fs.readFileSync(path.join(this.path, label + ".js"));
    } catch(err) {
      this.data = "const prefix = require(\"droom.js\").Client.commandOptions.prefix;";
      this.data += "function " + label + "(message) {\n";
      this.data += "\tlet msg = message.content.split(\" \");\n";
      this.data += "\tlet req = false;\n";
      this.data += "\tfor (i = 0; i < prefix.length; i++) {\n";
      this.data += "\t\tif (msg[0].startsWith(prefix[i])) req = true;\n";
      this.data += "\t\tmsg[0] = msg[0].slice(prefix[i].length);";
      this.data += "\t}";
      this.data += "\tif (!req) return;\n";
      this.data += "\tif (!~" + options.commandAliases + ".indexOf(msg[0].toLowerCase()) && msg[0] !== " + label + ") return;\n";
      if (options.args) {
        this.data += "\tlet args = message.content.split(\" \").slice(1).join(\" \");\n\tif (!args) return message.channel.createMessage(" + options.invalidUsage + ");\n";
      }
      if (!options.guild) {
        this.data += "\tif (message.channel.guild) return;\n";
      } else if (!options.dm) {
        this.data += "\tif (message.channel.type === 1) return;\n";
      }
      this.data += "}\n\nmodule.exports = " + label + ";";
      fs.writeFileSync(path.join(this.path, label + ".js"), this.data);
    }
    this.file = require(path.join(this.path, label + ".js"));
    Handler.onMessageCreate(this.file);
    this.commands[label] = options;
  }
  HandleEvents(item) {
    if (!Array.isArray(item)) throw new TypeError("incorrect item format (item must be an array of strings)");
    item.forEach((y, index) => {
      if (typeof y !== "string") {
        throw new TypeError("incorrect item format (item must be a string, index " + index + ")");
      }
    });
  }

}
