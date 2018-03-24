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
  registerCommand(label, options, prefix, excPath) {
    this.options = options;
    if (!excPath) {
      try {
        fs.readFileSync(path.join(this.path, label + ".js"));
      } catch(err) {
        this.data = "const drooM = require(\"droom.js\");\n\n";
        this.data += "function " + label + "(droom, message, args) {\n";
        this.data += "\tconst client = droom._client;\n";
        this.data += "}\n\nmodule.exports.run = " + label + ";\nmodule.exports.path = __dirname + \"/" + label + ".js\";";
        fs.writeFileSync(path.join(this.path, label + ".js"), this.data);
      }
      this.file = require(path.join(this.path, label + ".js"));
      return this.file;
    } else {
      try {
        this.file = require(excPath);
        return this.file;
      } catch(err) {
        throw new Error(`file ${excPath} not found`);
      }
    }
  }
  HandleEvents(item) {
    if (!Array.isArray(item)) throw new TypeError("incorrect item format (item must be an array)");
    var t = item.map((y, index) => {
      try {
        fs.readFileSync(path.join(this.evp, y + ".js"));
      } catch(err) {
        this.data = "const drooM = require(\"droom.js\");\n\n";
        this.data += "function " + y + "(droom, param1, param2, param3) {\n\tconst client = droom._client;\n}";
        this.data += "\n\nmodule.exports = " + y + ";";
        fs.writeFileSync(path.join(this.evp, y + ".js"), this.data);
      }
      this.file = require(path.join(this.evp, y + ".js"));
      return this.file;
    });
    console.log(t);
    return t;
  }
}

module.exports = Registry;
