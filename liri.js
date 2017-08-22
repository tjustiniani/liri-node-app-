var keys = require("./keys.js");

var Twitter = require('twitter');

var LastFmNode = require('lastfm').LastFmNode;
 
var request = require('request');

var getMyTweets = function() {

var client = new Twitter(keys.twitterKeys);

 
var params = {screen_name: 'MiloMischievous'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    // console.log(tweets);
    for(var i = 0; i<tweets.length; i++){
        console.log(tweets[i].created_at);
        console.log(' ');
        console.log(tweets[i].text);
      }
    }
  });
}

var getMeLastfm = function (songName) {

var lastfm = new LastFmNode({
  api_key: 'e29118b78d766ac8f082b3f96ffd8e71', 
  secret: 'd7dc842e61b179dec4701f6205a8f52b',
  useragent: 'appname/vX.X MyApp' 
});


var trackStream = lastfm.stream('username');

trackStream.on('lastPlayed', function(track) {
  console.log('Last played: ' + track.name);
});

trackStream.on('nowPlaying', function(track) {
  console.log('Now playing: ' + track.name);
});

trackStream.on('scrobbled', function(track) {
  console.log('Scrobbled: ' + track.name);
});

trackStream.on('stoppedPlaying', function(track) {
  console.log('Stopped playing: ' + track.name);
});

trackStream.on('error', function(error) {
  console.log('Error: '  + error.message);
});

trackStream.start();

var session = lastfm.session({
   token: token,
   handlers: {
      success: function(session) {
         lastfm.update('nowplaying', session, { track: track } );
         lastfm.update('scrobble', session, { track: track, timestamp: 12345678 });
      }
   }
});

var request = lastfm.request("artist.getInfo", {
    artist: "The Mae Shi",
    handlers: {
        success: function(data) {
            console.log("Success: " + data);
        },
        error: function(error) {
            console.log("Error: " + error.message);
        }
    }
});


var getMeLastfm = function (songName) {
const lastfm = new LastFM('e29118b78d766ac8f082b3f96ffd8e71', { userAgent: 'MyApp/1.0.0 (http://example.com)' })
 
lastfm.trackSearch({ track: 'the greatest' }, (err, data) => {
  if (err) console.error(err)
  else  console.log(data);
})}

}


var getMeMovie = function(movieName) {
request('http://www.omdbapi.com/?apikey=40e9cece&t=' + movieName + '&y=&plot=short&r=json', function (error, response, body){

  if (!error && response.statusCode == 200){

    var jsonData = JSON.parse(body);
    console.log( 'Title: ' + jsonData.Title);
    console.log( 'Year: ' + jsonData.Year);
    console.log( 'Rated: ' + jsonData.Rated);
    console.log( 'IMDB Rating: ' + jsonData.imdbRating);
    console.log( 'Country: ' + jsonData.Country);
    console.log( 'Language: ' + jsonData.Language);
    console.log( 'Plot: ' + jsonData.Plot);
    console.log( 'Actors: ' + jsonData.Actors);
    console.log( 'Rotten Tomatoes Rating: ' + jsonData.tomatoRating);
    console.log('Rotten tomatoes URL: ' + jsonData.tomatoURL);
  }
  });
}

var doWhatItSays = function(){
  fs.readFile('random.txt','utf8',function (err, data) {
  if (err) throw err;

  var dataArr = data.split(',');

  if (dataArr.length ==2){
    pick(dataArr[0], dataArr[1]);
  } else if (dataArr.length ==1){
    pick(dataArr[0]);
  }

})}



 var pick = function(caseData, functionData) {
    switch(caseData){
        case 'my-tweets':
           getMyTweets();
           break;
        case 'lastfm-this-song':
           getMeLastfm(functionData);
           break;
        case 'movie-this':
           getMeMovie(functionData);
        case 'doWhatItSays':
           doWhatItSays();
           break;
           default:
           console.log('LIRI does not know that');
    }
}

var runThis = function(argOne, argTwo) {
    pick(argOne, argTwo)
};
runThis(process.argv[2], process.argv[3]);

