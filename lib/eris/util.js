"use strict";

/* eslint-disable */
const eris = require("eris");

const Client = require("../../src/Client");
const Message = require("../../src/structures/Message");
const User = require("../../src/structures/User");
/* eslint-enable */

/**
 * @prop {Client} client
 */
class Util {
  /**
   * 
   * @param {Client} client 
   */
  setClient(client) {
    this.client = client;
  }
  /**
   * @param {eris.Message} msg 
   * @param {Boolean} shouldAddAuthor 
   */
  messageToDrooMMessage(msg, shouldAddAuthor) {
    const obj = {
      id: msg.id,
      author: shouldAddAuthor ? new User(msg.author) : null,
      content: msg.content,
      embeds: msg.embeds,
      files: msg.attachments,
      timestamp: msg.timestamp,
      deleted: false,
      edited: msg.editedTimestamp || 0,
      pinned: false,
      tts: msg.tts,
      type: msg.type,
      mentions: {
        user: msg.mentions,
        role: msg.roleMentions,
        channel: msg.channelMentions,
        everyone: msg.mentionEveryone
      },
      channelID: msg.channel.id
    };
    if(!this.client.options.ignoreRpcData) {
      obj.activity = msg.activity;
      obj.application = msg.application;
    }
    return new Message(obj);
  }
}

module.exports = new Util;