"use strict";

const { EventEmitter } = require("events");
const FS = require("fs");
const Path = require("path");

const EventService = require("./EventService"); 
const lib = require("../lib/lib");

let YAML;
try {
  YAML = require("yaml");
} catch(err) {} // eslint-disable-line

/**
 * The client you will use to log in
 * @prop {lib.handler} handler Handles everything with the native client
 */
class Client extends EventEmitter {
  /**
   * @param {String} token The token
   * @param {Object} [clientOptions] Options to pass to the native client
   * @param {Object} [options] Options to initiate the client with
   */
  constructor(token, clientOptions, options) {
    super();

    this.handler = new lib.handler(lib.createClientObject(token, clientOptions));
    this.eventService = new EventService(this);
    this.options = options;
  }

  /**
   * Create a new client instance from a config file instead of manually setting everything up
   * @param {String} file The config file
   * @returns {Client} The initiated client object ready for launch
   */
  static loadFromConfig(file) {
    let conf;
    const absoluteFile = file.startsWith(process.cwd()) ? file : Path.join(process.cwd(), file);

    if(absoluteFile.endsWith(".yml")) {
      if(!YAML) {
        throw new Error("Please install yaml to load from a yaml config!");
      }
      conf = YAML.parse(FS.readFileSync(file));
    }

    if(absoluteFile.endsWith(".json")) {
      conf = JSON.parse(FS.readFileSync(file));
    }

    if(absoluteFile.endsWith(".js")) {
      conf = require(file);
    }

    const client = new Client(conf.token, conf.clientOptions, conf.options);
    if(conf.commandsFolder) {
      client.registerCommandsFolder(conf.commandsFolder);
    }
    if(conf.eventsFolder) {
      client.registerEventsFolder(conf.eventsFolder);
    }
    return client;
  }

  /**
   * Register all commands found in a folder
   * @param {String} folder 
   */
  registerCommandsFolder(folder) { // eslint-disable-line
    
  }

  registerEventsFolder(folder) { // eslint-disable-line

  }
}

module.exports = Client;