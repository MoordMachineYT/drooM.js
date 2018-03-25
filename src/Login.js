var mod;

function login(lib, opt, tok) {
  mod = require(lib);
  if (lib === "discord.js") {
    return new mod.Client(opt);
  } else if (lib === "eris") {
    return new mod(tok, opt);
  }
}

module.exports = login;
