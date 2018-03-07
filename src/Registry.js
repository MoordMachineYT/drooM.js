"use strict";
const Client = require("./Client.js");
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
  registerCommand(label, options, prefix) {
    if (this.commands[label]) throw new Error("you already registered a command with label '" + label + "'");
    this.options = options;
    try {
      fs.readFileSync(path.join(this.path, label + ".js"));
    } catch(err) {
      this.data = "function " + label + "(client, message) {\n";
      this.data += "}\n\nmodule.exports.run = " + label + ";";
      fs.writeFileSync(path.join(this.path, label + ".js"), this.data);
    }
    this.file = require(path.join(this.path, label + ".js"));
    return this.file;
    this.commands[label] = this.options;
  }
  HandleEvents(item) {
    if (!Array.isArray(item)) throw new TypeError("incorrect item format (item must be an array)");
    var t = item.map((y, index) => {
      try {
        fs.readFileSync(path.join(this.evp, y + ".js"));
      } catch(err) {
        this.data = "function " + y + "() {\n\n}";
        this.data += "module.exports = " + y;
        fs.writeFileSync(path.join(this.evp, y + ".js"), this.data);
      }
      this.file = require(path.join(this.evp, y + ".js"));
      return this.file;
    });
    return t;
  }
}

module.exports = Registry;
