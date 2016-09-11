var express = require('express');
var router = express.Router();
var utils = require("../helpers/utils");

var mongoose = require('mongoose');
var miniQ = require('../models/miniQ.js');

var miniq = new miniQ();

/* GET /list List. */
router.get('/list', function(req, res, next) {
  var param = {res: res, next: next};
  miniq.show(param);
});

/* POST /host/create/ Create */
router.post('/create', function(req, res, next) {
  var param = {req: req, res: res, next: next};
  miniq.create(param);
});

/* GET /host/find/id Read */
router.get('/find/:id', function(req, res, next) {
  var param = {req: req, res: res, next: next};
  miniq.find(param);
});


/* PUT /host/update/:id Update */
router.put('/update/:id', function(req, res, next) {
  miniQ.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /host/delete/:id Delete */
router.delete('/delete/:id', function(req, res, next) {
  miniQ.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/poll/', function(req, res, next) {
  var param = {req: req, res: res, next: next};
  miniq.poll(param);
});

module.exports = router;
