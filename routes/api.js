var express = require('express');
var router = express.Router();
var app = require('../app');

router.get('/version', function(req, res, next) {
  res.send('version');
});

router.post('/inform', function(req, res, next) {
  if (app.db) {
    if (req.body.mac && req.body.secret) { // TODO: Add more validation
      var nodes = app.db.collection('nodes');
      nodes.replaceOne({mac:req.body.mac, secret:req.body.secret}, req.body, {upsert: true});
      res.send('OK');
    } else {
      // Validation failed
      res.status(400).send('ERR');
    }
  } else {
    // DB not connected yet, do a 503
    res.status(503).send('ERR');
  }
});

module.exports = router;
