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
var spotify = new Spotify({
  id: "b249ae6a0bad4f96b7e3ae71d72796fd",
  secret: "10261a51b35a4f9aa042af8d42666da9"
});


//insted of ajax call, you can use the twitter npm
function myTweets(){
	if(nodeArg1 === "my-tweets"){
		//Grabbing the file keys.js, then grabbing the twitterKeys export.
		var client = new twitter(keys.twitterKeys);
		var params = {
    	screen_name: "EdricAtUCLA"
  		};

		client.get("statuses/user_timeline", {q: params} , function(error, tweets, response) {
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
		// Writes to the log.txt file
		function getArtistNames(artist) {
		  return artist.name;
		};
		function getMeSpotify(songName) {
		  if (songName === undefined) {
		    songName = "What's my age again";
		  }

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