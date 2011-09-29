var EventEmitter = require('events').EventEmitter,
    https = require('https'),
    base64 = require('./base64');

var Base = function(basePath){
  this.baseUri = 'boxcar.io';
  this.basePath = basePath;
  EventEmitter.call(this);
}

Base.prototype = new EventEmitter;
Base.constructor = Base;

Base.prototype.post = function(path, dataObj, auth){
  var self = this, dataArr = [];
  for (obj in dataObj){
    if (dataObj[obj]){
      dataArr.push(obj + '=' + dataObj[obj]);  
    }
  }
  var data = dataArr.join('&');
  
  var options = {
    host: self.baseUri,
    port: 443,
    path: self.basePath + path,
    method: 'POST',
    headers:{
      'Content-Length': data.length
    }
  };
  
  if (auth){
    options.headers['Authorization'] = 'Basic ' + base64.encode(auth.username + ':' + auth.password);
  }

  var req = https.request(options, function(res) {
    var resBody = "";
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      resBody += chunk;
    });
    
    res.on('end', function(){
      self.emit('response', res.statusCode);
    });
  });

  req.write(data);
  req.end();  
}

module.exports = Base;