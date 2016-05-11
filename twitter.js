var Twitter = require('twitter');
var _ = require('underscore');

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
};

var params = {screen_name: 'nodejs'};

var followUser = function(userIds, tweetHandler) {
  client.stream('statuses/filter', { follow: userIds}, function(stream) {
    stream.on('data', function(t) {
      var tweet = new Tweet(t);
      tweetHandler(tweet);
    });

    stream.on('error', function(error) {
      console.log(error);
    });
  });
};

exports.followUser = followUser;
