var fs = require("fs");
var twitter = require("twitter");
var keys = require("./keys.js");
var keyList = keys.twitterKeys;
var keysArr = [];
var nodeArg1 = process.argv[2];
var nodeArg2 = process.argv[3];
var client = new twitter({
  consumer_key: 'ie5tNWqxsiH03WUZaO2DJCKAy',
  consumer_secret: 'R6OtB5AjPyzPd3Kd7NBCJpt5bB9RB2T00FTDds2q7CKPYdHFfj',
  access_token_key: '885644731367120896-cGqQCrbcRVbx3TTv8q5nsajjPGUiqq7',
  access_token_secret: 'nZunCxqt3dRHMT5cb0SL7gPjIafOxRF7a6EhC5uDbt6Rd',
});

// for(var key in keyList){
// 	keysArr.push(keyList[key]);
// 	// console.log(keyList[key]);
// }

// var ck = keysArr[0];
// var cs = keysArr[1];
// var atk = keysArr[2];
// var ats = keysArr[3];

//insted of ajax call, you can use the twitter npm
function myTweets(){
	if(nodeArg1 === "my-tweets"){
		client.get('search/tweets', {q: "edricAtUCLA" }, function(error, tweets, response) {
   		console.log(JSON.parse(response));
		});

		// $.ajax({
		// 	url: "",
		// 	method: "GET"
		// }).done(function(response){

		// })
	}
}

function spotifyThis(){
	if(nodeArg1 === "spotify-this-song"){

	}
}

function movieThis(){
	if(nodeArg1 === "movie-this"){

	}
}

function doWhatItSays(){
	if(nodeArg1 === "do-what-it-says"){

	}
}

myTweets();