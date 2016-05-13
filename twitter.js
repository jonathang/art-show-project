var Twitter = require('twitter');
var _ = require('underscore');
var util = require('util');

var client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

var Tweet = function (tweet) {
  this.text = tweet.text;
  this.createdAt = tweet.created_at;
  this.userName = tweet.user.name;
  this.userId = tweet.user.id_str;
};

var params = {screen_name: 'nodejs'};
var getLastTweet = function(userName, cb) {
  client.get('search/tweets', {from: 'goldberg_yoni'}, function(er, tweets, response){
    if (er) {
      console.error(er);
    } else {
      if (tweets.statuses.length == 0) {
        console.error("Invalid user to follow, as it has no tweets");
      } else {
        var lastTweet = new Tweet(tweets.statuses[0]);
        cb(lastTweet);
      }
    }
  });
};

var followUser = function(userId, tweetHandler, cb) {
  client.get('search/tweets', {from: 'goldberg_yoni'}, function(er, tweets, response){
    if (er) {
      console.error(er);
    } else {
      if (tweets.statuses.length == 0) {
        console.error("Invalid user to follow, as it has no tweets");
      } else {
        var lastTweet = new Tweet(tweets.statuses[0]);
        tweetHandler(lastTweet);
        client.stream('statuses/filter', { follow: lastTweet.userId}, function(stream) {

          stream.on('data', function(t) {
            var tweet = new Tweet(t);
            tweetHandler(tweet);
          });

          stream.on('error', function(error) {
            console.log(error);
          });
        });
        cb();
      }
    }
  });
};

exports.followUser = followUser;
exports.getLastTweet = getLastTweet;
