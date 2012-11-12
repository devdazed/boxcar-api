var Base = require('./base'),
    md5 = require('./md5');

var Provider = function(providerKey, providerSecret){
  if (providerKey == null) throw ("Please specify a provider key");
  this.providerKey = providerKey;
  this.providerSecret = providerSecret;
  Base.call(this, '/devices/providers/' + providerKey + '/notifications')
}

Provider.prototype = new Base;
Provider.constructor = Provider;

Provider.prototype.subscribe = function(email){
  this.post('/post', {
    "email": hashEmail(email)
  });
}

Provider.prototype.notify = function(email, message, fromScreenName, fromRemoteServiceId, redirectPayload, sourceUrl, iconUrl){
  this.post('/', {
    "email": email,
    "notification[message]": message,
    "notification[from_screen_name]": fromScreenName,
    "notification[from_remote_service_id]": fromRemoteServiceId,
    "notification[redirect_payload]": redirectPayload,
    "notification[source_url]": sourceUrl,
    "notification[icon_url]": iconUrl
  });
}

Provider.prototype.broadcast = function(message, fromScreenName, fromRemoteServiceId, redirectPayload, sourceUrl, iconUrl){
  var self = this;
  if (self.providerSecret == null) throw("No Secret Key Specified");
  this.post('/broadcast', {
    "secret": self.providerSecret,
    "notification[message]": message,
    "notification[from_screen_name]": fromScreenName,
    "notification[from_remote_service_id]": fromRemoteServiceId,
    "notification[redirect_payload]": redirectPayload,
    "notification[source_url]": sourceUrl,
    "notification[icon_url]": iconUrl
  });
}

function hashEmail(email){
  return /@/.test(email) ? md5.hex(email) : email  
}
module.exports = Provider;
