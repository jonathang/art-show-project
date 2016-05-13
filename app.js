'use strict';
var twitter = require('./twitter');
var util = require('util');
var morse = require('morse');
var Repeat = require('repeat');
var _ = require('underscore');
var sleep = require('sleep');

var GPIO = require('onoff').Gpio;
var led = new GPIO(18, 'out');

var SLEEP_PERIOD_MSEC = 50000;
var USER_TO_FOLLOW = 'KimKardashian';

var handleTweet = function()  {
  twitter.getLastTweet(USER_TO_FOLLOW, function(tweet) {
    console.log('text: ' + tweet.text);
    var morseText = morse.encode(tweet.text).split('');
    console.log('morse : ' + morseText);
    _.each(morseText, function(morseChar) {

      switch (morseChar) {
        case '?':
          led.writeSync(0);
          sleep.usleep(SLEEP_PERIOD_MSEC);
          break;
        case ' ':
          led.writeSync(1);
          sleep.usleep(SLEEP_PERIOD_MSEC);
          break;
        case '.':
          led.writeSync(1);
          sleep.usleep(SLEEP_PERIOD_MSEC);
          led.writeSync(0);
          break;
        case '-':
          led.writeSync(1);
          sleep.usleep(SLEEP_PERIOD_MSEC * 3);
          led.writeSync(0);
          break;
      }
    });
    console.log("finished");
  });
};

Repeat(handleTweet).every(1000, 'ms').for(1000000, 'hours').start.in(2, 'sec');
