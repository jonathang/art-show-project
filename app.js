'use strict';
var twitter = require('./twitter');
var util = require('util');
var morse = require('morse');
// A string with comma seperate ids
var USERS_TO_FOLLOW = '730406269299863552,730418816367366144';

var handleTweet = function(tweet)  {
  console.log(util.inspect(tweet));
  console.log(morse.encode(tweet.text));
}

twitter.followUser(USERS_TO_FOLLOW, handleTweet);
