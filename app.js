'use strict';
var twitter = require('./twitter');
var util = require('util');
var morse = require('morse');
var Repeat = require('repeat');

var USER_TO_FOLLOW = 'goldberg_yoni'
var current_tweet = 'No Tweet'

var handleTweet = function(tweet)  {
  current_tweet = tweet.text;
  console.log(util.inspect(tweet));
  console.log(morse.encode(tweet.text));
}

var handleMorseLights = function() {
  console.error(current_tweet);
};

twitter.followUser(USER_TO_FOLLOW, handleTweet)
Repeat(handleMorseLights).every(1000, 'ms').for(1000000, 'hours').start.in(2, 'sec');
