var Base = require('./base');

var User = function(email, password){
  if (email == null || password == null) throw ("Please specify a username and password");
  this.auth = {"username":email, "password":password};
  Base.call(this, '/notifications');
}

User.prototype = new Base;
User.constructor = User;

User.prototype.notify = function(message, fromScreenName, fromRemoteServiceId, sourceUrl, iconUrl){
  var self = this;
  this.post('/', {
    "notification[message]": message,
    "notification[from_screen_name]": fromScreenName,
    "notification[from_remote_service_id]": fromRemoteServiceId,
    "notification[source_url]": sourceUrl,
    "notification[icon_url]": iconUrl  
  }, self.auth)
}

module.exports = User;