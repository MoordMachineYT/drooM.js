"use strict";

/**
 * @abstract
 */
class Context {
  constructor(event) {
    this.event = event;
  }
  toString() {
    return `<${this.constructor.name} ${this.event}>`;
  }
}

module.exports = Context;