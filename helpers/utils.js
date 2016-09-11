var fs = require('fs');
var config = require('../config.json');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

exports.logMessage = function(item){
  try {
    var itemsToWrite = [];
    itemsToWrite.push(item);
    fs.writeFile(config.processedMessages, JSON.stringify(itemsToWrite, null, 2), function (err) {
      if (err) return console.log(err);
      console.log('item processed and logged');
    });
    return true;
  } catch (err) {
    console.log(err)
    return false;
  }
};

exports.initDb = function(){
  mongoose.connect('mongodb://'+config.dbhost+'/'+config.dbname).then((function(_this) {
    return function() {
      return console.log('db connection established');
    };
  })(this)).catch((function(_this) {
    return function(err) {
      return console.error(err);
    };
  })(this));
}