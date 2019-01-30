'use strict';

require('dotenv').load({ silent: true });

var express = require('express');
var app = express();
var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

// Bootstrap application settings
require('./config/express')(app);

// Create the service wrapper
var toneAnalyzer = new ToneAnalyzerV3({
  // If unspecified here, the TONE_ANALYZER_USERNAME and TONE_ANALYZER_PASSWORD environment properties will be checked
  // or TONE_ANALYZER_IAM_APIKEY if is available
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  // username: '<username>',
  // password: '<password>',
  version: '2017-09-21'
});

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/api/tone', function(req, res, next) {
  toneAnalyzer.tone(req.body, function(err, data) {
    if (err) {
      return next(err);
    }
    return res.json(data);
  });
});

// error-handler application settings
require('./config/error-handler')(app);

module.exports = app;
