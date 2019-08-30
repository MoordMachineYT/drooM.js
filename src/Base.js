"use strict";

const Client = require("./Client"); // eslint-disable-line

/**
 * The base class
 */
class Base {
  /**
   * @param {String} id 
   * @param {Client} client
   */
  constructor(id, client) {
    /**
     * @prop {String} id
     */
    this.id = id;
    this.client = client;
  }
}

module.exports = Base;