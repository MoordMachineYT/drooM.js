class Command {
  static permissionCheck(command, msg) {
    var thisa = {
      req: false
    };
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
  }
}

module.exports = Command;
