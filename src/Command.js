class Command {
  static permissionCheck(command, msg, lib) {
    var thisa = {
      req: false
    };
    switch (lib) {
      case "eris":
        if (!command.guild && msg.channel.guild) return null;
        if (!command.dm && msg.channel.type === 1) return null;
        if (command.req.custom) {
          if (typeof command.req.custom === "function") {
            thisa.req = true;
            var cur = command.req.custom(msg);
            if (cur) return true;
          }
        }
        if (command.req.permissions[0]) {
          thisa.req = true;
          var permissions = msg.channel.permissionsOf(msg.author.id).json;
          var req = command.req.permissions;
          for (var i = 0; i < req.length; i++) {
            if (!permissions[req[i]]) {
              thisa.req = false;
              break;
            }
          }
          if (thisa.req || msg.member.permission.has("administrator")) return true;
          thisa.req = true;
        }
        if (command.req.roleIDs[0]) {
          thisa.req = true;
          var cur;
          var roles = msg.member.roles;
          command.req.roleIDs.forEach(item => {
            if (~roles.indexOf(item)) {
              cur = true;
            }
          });
          if (cur) return true;
        }
        if (command.req.rolenames[0]) {
          thisa.req = true;
          var cur;
          var roles = msg.member.roles.map(role => msg.channel.guild.roles.get(role).name);
          command.req.rolenames.forEach(item => {
            if (~roles.indexOf(item)) {
              cur = true;
            }
          });
          if (cur) return true;
        }
        if (command.req.userIDs[0]) {
          thisa.req = true;
          if (~command.req.userIDs.indexOf(msg.author.id)) return true;
        }
        if (command.req.usernames[0]) {
          thisa.req = true;
          if (~command.req.usernames.indexOf(msg.author.username)) return true;
        }
        return !thisa.req;
        break;
      case "discord.js":
        if (!command.guild && msg.guild) return null;
        if (!command.dm && !msg.guild) return null;
        if (command.req.custom) {
          if (typeof command.req.custom === "function") {
            thisa.req = true;
            var cur = command.req.custom(msg);
            if (cur) return true;
          }
        }
        if (command.req.permissions[0]) {
          thisa.req = true;
          var cur = false;
          const permissions = msg.channel.permissionsFor(message.member);
          command.req.permissions.forEach(perm => {
            if (!permissions.has(perm)) cur = true;
          });
          if (!cur || permissions.has("ADMINISTRATOR")) return true;
        }
        if (command.req.roleIDs[0]) {
          thisa.req = true;
          var cur = false;
          command.req.roleIDs.forEach(role => {
            if (msg.member.roles.has(role)) cur = true;
          });
          if (cur) return true;
        }
        if (command.req.rolenames[0]) {
          thisa.req = true;
          var cur = false;
          command.req.rolenames.forEach(role => {
            if (msg.member.roles.exists("name", role)) cur = true;
          });
          if (cur) return true;
        }
        if (command.req.userIDs[0]) {
          thisa.req = true;
          if (~command.req.userIDs.indexOf(msg.author.id)) return true;
        }
        if (command.req.usernames[0]) {
          thisa.req = true;
          if (~command.req.usernames.indexOf(msg.author.name)) return true;
        }
        return !thisa.req;
        break;
    }
  }
  static commandCheck(message, prefixes) {
    const prefix = prefixes.filter(pref => message.content.startsWith(pref));
    if (!prefix[0]) return false;
    return prefix[0].length;
  }
}

module.exports = Command;
