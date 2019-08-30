"use strict";

const CommandExecutor = require("./CommandExecutor");

class Command {
  constructor(client, name, executor) {
    this.client = client;
    this.name = name;
    if(!(executor instanceof CommandExecutor)) {
      throw new TypeError("executor is not a CommandExecutor!");
    }
  }
}

module.exports = Command;