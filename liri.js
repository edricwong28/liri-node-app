// Import the FS package for read/write.
var fs = require("fs");
// Import the Twitter NPM package.
var twitter = require("twitter");
// Import the Keys file
var keys = require("./keys.js");
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the request npm package.
var request = require("request");
var keyList = keys.twitterKeys;
var keysArr = [];
var nodeArg1 = process.argv[2];
var nodeArg2 = process.argv[3];
// var client = new twitter({
//   consumer_key: 'ie5tNWqxsiH03WUZaO2DJCKAy',
//   consumer_secret: 'R6OtB5AjPyzPd3Kd7NBCJpt5bB9RB2T00FTDds2q7CKPYdHFfj',
//   access_token_key: '885644731367120896-cGqQCrbcRVbx3TTv8q5nsajjPGUiqq7',
//   access_token_secret: 'nZunCxqt3dRHMT5cb0SL7gPjIafOxRF7a6EhC5uDbt6Rd',
// });


//insted of ajax call, you can use the twitter npm
function myTweets(){
	if(nodeArg1 === "my-tweets"){
		var client = new twitter(keys.twitterKeys);
		var params = {
    	screen_name: "edricAtUCLA"
  		};

		client.get('search/tweets', params, function(error, tweets, response) {
   			for (var i = 0; i < tweets.length; i++) {
	        	console.log(tweets[i].created_at);
	        	console.log("");
	        	console.log(tweets[i].text);
      		}
		});
	}
}

function spotifyThis(songName){
	if(nodeArg1 === "spotify-this-song"){

		var songName = nodeArg2;

		 spotify.search(
	    {
	      type: "track",
	      query: songName
	    },
		   function(err, data) {
		      if (err) {
		        console.log("Error occurred: " + err);
		        return;
		      }

		      var songs = data.tracks.items;

		      for (var i = 0; i < songs.length; i++) {
		        console.log(i);
		        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
		        console.log("song name: " + songs[i].name);
		        console.log("preview song: " + songs[i].preview_url);
		        console.log("album: " + songs[i].album.name);
		        console.log("-----------------------------------");
		      }
		    }
		  );

	}else if(songName === undefined) {
    songName = "What's my age again";
  	}; 
};

function movieThis(movieName){
	if(nodeArg1 === "movie-this"){

	var movieName = nodeArg2;
	var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=40e9cece";

		request(urlHit, function(error, response, body) {
		    if (!error && response.statusCode === 200) {
		      var jsonData = JSON.parse(body);

		      console.log("Title: " + jsonData.Title);
		      console.log("Year: " + jsonData.Year);
		      console.log("Rated: " + jsonData.Rated);
		      console.log("IMDB Rating: " + jsonData.imdbRating);
		      console.log("Country: " + jsonData.Country);
		      console.log("Language: " + jsonData.Language);
		      console.log("Plot: " + jsonData.Plot);
		      console.log("Actors: " + jsonData.Actors);
		      console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
		    }
	  	});

	}else if(movieName === undefined) {
    movieName = "Mr Nobody";
  }
}

function doWhatItSays(){
	if(nodeArg1 === "do-what-it-says"){
		    fs.readFile("random.txt", "utf8", function(error, data) {
		    console.log(data);

		    var dataArr = data.split(",");

		    if (dataArr.length === 2) {
		      pick(dataArr[0], dataArr[1]);
		    }
		    else if (dataArr.length === 1) {
		      pick(dataArr[0]);
		    }
		  });
	}
}

myTweets();
spotifyThis();
movieThis();
doWhatItSays();