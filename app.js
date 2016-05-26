'use strict';
var twitter = require('./twitter');
var util = require('util');
var morse = require('morse');
var Repeat = require('repeat');
var _ = require('underscore');
var sleep = require('sleep');

var DEBUG = false;

if (DEBUG) {
  var led = {
    writeSync : function(value) {
      if (value === 0) {
        console.log("turn off");
      } else {
        console.log("turn on");
      }
    }
  }
} else {
  var GPIO = require('onoff').Gpio;
  var led = new GPIO(18, 'out');
}

var SLEEP_PERIOD_MSEC = 200000 ;
var USER_TO_FOLLOW = 'KimKardashian';

var handleTweet = function()  {
  twitter.getLastTweet(USER_TO_FOLLOW, function(tweet) {

    console.log('Tweet Text: ' + tweet.text);

    var morseText = morse.encode(tweet.text);
    console.log('Morse Text: ' + morseText);
    var morseLetters = morseText.split(' ');
    console.log('Morse Letters Array: ' + morseLetters);

    _.each(morseLetters, function(morseLetter) {
      console.log('Morse Letter: ' + morseLetter);
      led.writeSync(0);
      if (morseLetter === '.......') {
        console.log("Word Space sleep for 4 units")
        sleep.usleep(SLEEP_PERIOD_MSEC * 4);
      } else {
        //Space between letters
        console.log("Letter Space sleep for 2 units")
        sleep.usleep(SLEEP_PERIOD_MSEC * 2);
        var morseChars = morseLetter.split('');
        _.each(morseChars, function(morseChar) {
          console.log("Char Space sleep for 1 unit");
          led.writeSync(0);
          sleep.usleep(SLEEP_PERIOD_MSEC);
          console.log('Morse Char: ' + morseChar);
          switch (morseChar) {
            case '.':
              led.writeSync(1);
              sleep.usleep(SLEEP_PERIOD_MSEC);
              break;
            case '-':
              led.writeSync(1);
              sleep.usleep(SLEEP_PERIOD_MSEC * 3);
              break;
            default:
              console.log("Unknown morse character" + morseChar)
              break;
            }
        });
      }
    });
    console.log("finished");
  });
};

Repeat(handleTweet).every(1, 'minute').for(1000000, 'hours').start.in(2, 'sec');
