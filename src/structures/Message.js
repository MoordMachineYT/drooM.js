"use strict";

const Base = require("../Base");
const User = require("./User"); // eslint-disable-line

/**
 * @prop {String} content The message content
 * @prop {Object[]} embeds The message embeds
 * @prop {Object[]} files Attached files
 * @prop {User} [author] The user that sent the message (not present via `client.sendMessage` or events)
 */
class Message extends Base {
  constructor(msg) {
    super(msg.id);
    Object.assign(this, msg);
  }
}

module.exports = Message;