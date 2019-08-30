"use strict";

const Client = require("./Client"); // eslint-disable-line

/**
 * Handles all events
 */
class EventService {
  /**
   * @param {Client} client 
   */
  constructor(client) {
    this.client = client;
  }
  subscribe() {
    
  }
}

module.exports = EventService;