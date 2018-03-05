const eris = require("./src/Login.js");
const Client = require("./src/Client.js");

function drooM(token, options, commandOptions) {
  if (!token) throw new Error("no token given");
  if (!options) options = {};
  if (!commandOptions) commandOptions = {};
  const cl = new eris(token, options);
  return new Client(cl, commandOptions);
}
drooM.Client = Client;
drooM.Login = eris;
drooM.Registry = require("./src/Registry.js");

module.exports = drooM;
