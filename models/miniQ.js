var mongoose = require('mongoose');
var config = require('../config.json');
var fs = require('fs');
var path = require('path');
var utils = require('../helpers/utils.js')



var mq = new mongoose.Schema({
  message: String,
  is_processed: { type: Boolean, default: false },
  is_polled: { type: Boolean, default: false },
  polled_at: { type: Date, default: Date.now },
  consumer_id: Number,
  created_at: { type: Date, default: Date.now },
});

mq.methods.show = function(arg){
  this.model("miniQ").find({},{},{
    sort:{created_at: 1} }, function (err, result) {
    if (err) return arg.next(err);
    arg.res.json(result);
  });
};

mq.methods.create = function(arg){
  this.model("miniQ").create(arg.req.body, function (err, post) {
    if (err) return arg.next(err);
    arg.res.json(post);
  });
};

mq.methods.find = function(arg){
  this.model("miniQ").findById(arg.req.params.id, function (err, post) {
    if (err) return arg.next(err);
    arg.res.json(post);
  });
};

mq.methods.poll = function(arg){
  var ids = [];
  var model = this.model("miniQ");

  var items = null;
  //finds the record whose 'is_polled' is false. and items are sorted by created_at.
  model.find({'is_polled': false}, {}, {limit : config.countOfItemsToProcess, sort:{created_at: 1} },  function (err, result) {
    items = result;
    if (err) return arg.next(err);
    for(var i = 0; i < result.length; i++){
      ids.push(result[i]._id)
    }

    //Updating the 'is_polled' to true. so that those messages are not available to other consumer while polling the messages.
    model.update({'_id': {$in: ids}}, {$set: {is_polled: true}}, { multi: true },function(err, updateResult){
      //sending result further for processing.
      items.forEach(function(item, index, arr) {

        if(utils.logMessage(item)){
          model.findById(item.id, function (error, item){
            console.log("This object will get deleted " + item);
            item.remove();
          });
        }else{
          //This will reset the 'is_polled' to false. thus making this item available for other consumer.
          model.update({_id: item.id}, {$set: {is_polled: false}}, {},function(err, itemdeleted){
            console.log("Item deleted ");
          });
        }
      })

      arg.res.json(result);
    })

  });
};

module.exports = mongoose.model('miniQ', mq);
