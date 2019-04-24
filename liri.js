//Global variables
//add code to read and set any environment variables with the dotenv package:
require("dotenv").config();

//node argument variables
let command = process.argv[2];
let nodeArgs = process.argv;

//concert-this command function
function concertThis() {
    let axios = require("axios");
    let moment = require("moment");

    let artist = "";

    for (let i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            artist = artist + "+" + nodeArgs[i]
        } else {
            artist += nodeArgs[i];
        }
    };

    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&date=2019-04-20%2C2019-08-20";

    axios.get(queryUrl).then(
        function (response) {
            let results = response.data;
            //console.log(results);
            if (results) {
                for (i = 0; i < results.length; i++) {

                    var date = results[i].datetime;
                    var venue = results[i].venue;

                    console.log("Venue Name: " + venue.name);
                    console.log("Location: " + venue.city + ", " + venue.country);
                    console.log("Concert date: " + moment(date).format("MM/DD/YYYY"));
                    console.log("--------------------------------------");
                }
            }
        })
};

//movie-this command function
function movieThis() {
    let axios = require("axios");

    let movieTitle = "";

    for (let i = 3; i < nodeArgs.length; i++) {

        if (i > 3 && i < nodeArgs.length) {
            movieTitle = movieTitle + "+" + nodeArgs[i]
        } else {
            movieTitle += nodeArgs[i];
        }
    };

    let queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=6cb07e09";
    //console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            //console.log(response.data);
            console.log("Movie Title: " + response.data.Title);
            console.log("Release Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country Produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot)
            console.log("Actors: " + response.data.Actors);
            console.log("\n---------------\n");
        });
};

//do-what-it-says command function
function doThis() {
    var fs = require("fs");
    var Spotify = require("node-spotify-api");
    var keys = require("../liri-node-app/keys");

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        //console.log(data);

        var dataArr = data.split(",");

        var spotify = new Spotify(
            keys.spotify);

        var trackName = dataArr[1];

        for (let i = 3; i < nodeArgs.length; i++) {
            if (i > 3 && i < nodeArgs.length) {
                trackName = trackName + "+" + nodeArgs[i]
            } else {
                trackName += nodeArgs[i];
            }
        };

        spotify.search({
            type: "track",
            query: trackName, limit: 1
        },
            function (err, data) {
                if (err) {
                    return console.log("Error occurred: " + err);
                }

                let response = data.tracks.items

                //console.log(response);
                if (response) {
                    for (i = 0; i < response.length; i++) {
                        var artists = response[i].album.artists[i].name;
                        var album = response[i].album.name;
                        var songName = response[i].name;
                        var preview = response[i].preview_url;

                        console.log("\n-------------------------------------------------\n" + "Artist/Band Name: " + artists + "\nSong Name: " + songName + "\nAlbum Name: " + album + "\nPreview URL: " + preview
                            + "\n------------------------------------------------------------\n");
                    }
                }
            })
    })
};

//spotify-this-song function
function spotifyThis() {
    var Spotify = require("node-spotify-api");
    var keys = require("../liri-node-app/keys");

    var spotify = new Spotify(
        keys.spotify);

    var trackName = "";

    for (let i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            trackName = trackName + "+" + nodeArgs[i]
        } else {
            trackName += nodeArgs[i];
        }
    };

    spotify.search({
        type: "track",
        query: trackName, limit: 1
    },
        function (err, data) {
            if (err) {
                return console.log("Error occurred: " + err);
            }
            let response = data.tracks.items

            //console.log(response);
            if (response) {
                for (i = 0; i < response.length; i++) {
                    var artists = response[i].album.artists[i].name;
                    var album = response[i].album.name;
                    var songName = response[i].name;
                    var preview = response[i].preview_url;

                    console.log("Artist/Band Name: " + artists + "\nSong Name: " + songName + "\nAlbum Name: " + album + "\nPreview URL: " + preview
                        + "\n------------------------------------------------------------\n");
                }
            }
        })
};

//command logic
if (command === "movie-this") {
    movieThis();
} else if (command === "concert-this") {
    concertThis();
} else if (command === "spotify-this-song") {
    spotifyThis();
} else if (command === "do-what-it-says") {
    doThis();
} else {
    console.log(error);
};

                //Add the code required to import the keys.js file and store it in a variable.


                //You should then be able to access your keys information like so
                //var spotify = new Spotify(keys.spotify);




                // Then run a request with axios to the OMDB API with the movie specified


