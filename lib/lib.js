"use strict";

function findLibrary() {
  try {
    // Favour eris over discord.js since it runs on lower memory
    exp.library = "eris";
    exp.handler = require("./eris/index");
    require("eris");
  } catch(err) {
    try {
      exp.library = "discord.js";
      exp.handler = require("./discord.js/index");
      require("discord.js");
    } catch(err) {
      throw new Error("Could not find a library to work with, install discord.js or eris!");
    }
  }
}

function createClientObject(token, options) {
  findLibrary();
  switch(exp.library) {
    case "eris": {
      return new(require("eris"))(token, options);
    }
    case "discord.js": {
      // Discord.js wants their token to be supplied via `client.login`
      // So we need a workaround
      const client = new(require("discord.js")).Client(options);
      client.token = token;
      return client;
    }
  }
}

const exp = module.exports = {
  createClientObject,
  handler: null,
  library: ""
};