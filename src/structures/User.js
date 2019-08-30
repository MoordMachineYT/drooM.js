"use strict";

const Base = require("../Base");

class User extends Base {
  constructor(user) {
    super(user.id);
    Object.assign(this, user);
  }
}

module.exports = User;