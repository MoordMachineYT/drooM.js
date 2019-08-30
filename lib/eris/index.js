"use strict";

const eris = require("eris"); // eslint-disable-line
const util = require("./util");

/**
 * Handles everything with the native client object
 */
class Handler {
  /**
   * 
   * @param {eris.Client} client The native client object
   */
  constructor(client) {
    this.client = client;
  }
  connect() {
    return this.client.connect();
  }
  async sendMessage(channelID, message) {
    const file = message.file;
    const msg = await this.client.createMessage(channelID, message, file);
    return util.messageToDrooMMessage(msg);
  }
}

module.exports = Handler;