"use strict";

/* eslint-disable */
const Context = require("./Context");
const Message = require("../structures/Message"); 
const User = require("../structures/User");
/* eslint-enable */

/**
 * @prop {Message} msg
 * @prop {User} sender
 */
class MessageContext extends Context {
  /**
   * @param {String} event
   * @param {Message} msg
   * @param {User} user
   */
  constructor(event, msg, user) {
    super(event);
    this.msg = msg;
    this.sender = user;
  }
}

module.exports = MessageContext;