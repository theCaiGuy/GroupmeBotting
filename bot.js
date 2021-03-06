var HTTPS = require('https');
var cool = require('cool-ascii-faces');
var botID = process.env.BOT_ID;
var image_getter = require('./image_service.js');

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^[Ss]how me*/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    process_request(request);
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function process_request(request) {
  var botResponse, options, body, botReq, defaultResponse, song_title, song_url;
  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : "",
    "attachments" : []
  };

  console.log("Handling request " + request.text)

  // if (request.text.length <= 8) {
  //   handleEmpty(body, options);
  // } else {
  //   raw_song_titles = request.text.substring(8).split(",");
  //   for (let song_title of raw_song_titles) {
  //     original_input = song_title
  //     song_title = song_title.toLowerCase();
  //     song_title = song_title.replace(/\s+/g, '');
  //     song_title = song_title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
  //     if (song_title.toLowerCase() == "arn") song_title = "allrightnow";
  //     if (song_title.toLowerCase() == "funfunfun") song_title = "ffun";
  //     if (song_title.toLowerCase() == "avengers") song_title = "avengerz";
  //     if (song_title == "list") {
  //       handleList(body, options);
  //     } else if (song_title == "info") {
  //       handleInfo(body, options);
  //     } else if (song_title == "help") {
  //       handleHelp(body, options);
  //     } else if (song_title == "asurprise") {
  //       handleSurprise(body, options);
  //     } else if (song_title == "where") {
  //       handleLocation(body, options);
  //     } else if (song_title == "teasers" || song_title == "teazers" || song_title == "teazerz" || song_title == "teaserz") {
  //       handleTeasers(body, options);
  //     } else if (song_title == "everything") {
  //       handleEverything(body, options);
  //     } else if (song_title == "audio") {
  //       handleAudio(body, options);
  //     } else if (song_title == "cuffs") {
  //       handleCuffs(body, options);
  //     } else if (song_title == "mump") {
  //       handleMump(body, options);
  //     } else if (song_title == "canonical") {
  //       handleCanonical(body, options);
  //     } else if (song_title == "thebestfuckingsexion" || song_title == "thebestsexion" || song_title == "bestsexion") {
  //       handleBestSexion(body, options);
  //     } else {
  //       handleSong(body, options, song_title, original_input);
  //     }
  //   }
  // }

  var responses = [
    "Nah",
    "I don't feel like it",
    "Maybe later",
    "Loading...",
    "Mump says no",
    "Go ask Natalie",
    "Canonical",
    "All anyone ever asks is SHOW ME THIS, never HOW IS CHARTZBOT",
    "I've decided to join CPG for the day",
    "I'm too old for this",
    "Show me UR MOM",
    "Do you think I'd make a good dollie?",
    "No u :)",
    "https://drive.google.com/file/d/0Bxuq1AeTSJFQdTgyQzRSNjF6LXc/view?usp=sharing",
    "https://youtu.be/elOwsJMKS10",
    "Wild Card has retired. Please direct all inquiries to Fenr. Thank you."
  ];

  body.text = responses[Math.floor(Math.random()*responses.length)];
  postMessage(body, options);
}

// "Show me"
function handleEmpty(body, options) {
  body.text = "Usage: \'Show me [song title] | help | info | teasers | audio | everything | list | where\'\n";
  body.text = body.text + "For multiple requests, separate by commas";
  postMessage(body, options);
}

// "Show me list"
function handleList(body, options) {
  body.text = "Here's a list of chartz I have\n";
  body.text = "All charts can be found at " + process.env.CHART_LINK;
  body.attachments = [{
    "type" : "image",
    "url" : image_getter.getList()
  }];
  postMessage(body, options);
}

// "Show me info"
function handleInfo(body, options) {
  botResponse = "|||||||||||||||||||||||||||||||||||||||||||||\n"
  botResponse = botResponse + "   LSJUMB Altoz Practice Bot   \n"
  botResponse = botResponse + "|||||||||||||||||||||||||||||||||||||||||||||\n"
  botResponse = botResponse + "Usage: \'Show me [song title] | help | info | teasers | audio | everything | list | where | the best fucking sexion\'\n";
  botResponse = botResponse + "For multiple requests, separate by commas\n";
  botResponse = botResponse + "Created by Michael Cai using Node.js in December 2017\n";
  botResponse = botResponse + "Based on a project by petemcgrath available at https://github.com/groupme/bot-tutorial-nodejs\n";
  botResponse = botResponse + "Source code available at https://github.com/theCaiGuy/ChartzBot\n";
  botResponse = botResponse + "All charts can be found at " + process.env.CHART_LINK +"\n";
  botResponse = botResponse + "For more information visit https://dev.groupme.com/\n";
  body.text = botResponse;
  postMessage(body, options);
}

// "Show me help"
function handleHelp(body, options) {
  botResponse = "\'Show me [song title]\' to retrieve the indicated chart\n";
  botResponse = botResponse + "\'Show me list\' for a list of all available chartz\n";
  botResponse = botResponse + "\'Show me where\' to find the shak\n"
  botResponse = botResponse + "\'Show me a surprise\' for a pleasant surprise\n";
  botResponse = botResponse + "\'Show me teasers\' for teasers\n";
  botResponse = botResponse + "\'Show me everything\' for a link to all chartz\n";
  botResponse = botResponse + "\'Show me audio\' for a link to old albumz\n";
  botResponse = botResponse + "\'Show me the best fucking sexion\' just in case you forget\n";
  botResponse = botResponse + "For multiple requests, separate by commas\n";
  botResponse = botResponse + "Ensure you are spelling the song title correctly\n";
  botResponse = botResponse + "For more troubleshooting help contact Wild Card\n";
  body.text = botResponse;
  postMessage(body, options);
}

// "Show me a surprise"
function handleSurprise(body, options) {
  body.text = "https://drive.google.com/file/d/0Bxuq1AeTSJFQdTgyQzRSNjF6LXc/view?usp=sharing";
  postMessage(body, options);
}

// "Show me where"
function handleLocation(body, options) {
  body.text = "Be there or be square";
  body.attachments = [{
    "type" : "location",
    "lat" : "37.4315",
    "lng" : "-122.1615",
    "name" : "Shak"
  }];
  postMessage(body, options);
}

// "Show me teasers"
function handleTeasers(body, options) {
  var teaser_links = [
    "https://i.groupme.com/2222x1624.png.101792173cad4495acf15b06c1df772b",
    "https://i.groupme.com/2222x1620.png.013ce87b318a42d39d2a2ef7005dcb14",
    "https://i.groupme.com/2222x1624.png.0560789ceb2e40b9a7526f2177fd7161",
    "https://i.groupme.com/2228x1634.png.8012be04631d4120b822e8330ba387ef",
  ]
  for (var i = 0; i < teaser_links.length; i++) {
    image_url = teaser_links[i];
    body.text = "Teazers page " + (i + 1)
    body.attachments = [{
      "type": "image",
      "url" : image_url
    }]
    postMessage(body, options);
  }
}

// "Show me everything"
function handleEverything(body, options) {
  body.text = "All charts can be found at " + process.env.CHART_LINK;
  postMessage(body, options);
}

// "Show me audio"
function handleAudio(body, options) {
  body.text = "Old albumz can be found at " + process.env.ALBUM_LINK;
  postMessage(body, options);
}

// "Show me [song title]"
function handleSong(body, options, song_title, original_input) {
  var found_song = image_getter.getURL(song_title);
  var image_url = found_song[0];
  var found_title = found_song[1];
  if (image_url == "") {
    var possible_spellings = image_getter.getPossibleSpellings(original_input);
    body.text = "Sorry, I couldn't find your chart \'" + original_input + "\'. Did you mean: \n"
    for (var i = 0; i < possible_spellings.length; i++) {
      body.text = body.text + possible_spellings[i] + "\n";
    }
    body.text = body.text + "Try \'Show me list\' for a list of all the chartz I have or \'Show me help\' for troubleshooting help."
  } else {
    body.text = "Here's your song: " + found_title;
    body.attachments = [{
      "type" : "image",
      "url" : image_url
    }]
  }
  postMessage(body, options);
}

// "Show me cuffs"
function handleCuffs(body, options) {
  body.text = "Look at this BEAUTY";
  body.attachments = [{
    "type" : "image",
    "url" : "https://i.groupme.com/1484x2056.jpeg.e73436c4c34244e9a6a33ce6425edb72"
  }]
  postMessage(body, options);
}

// "Show me mump"
function handleMump(body, options) {
  body.attachments = [{
    "type" : "image",
    "url" : "https://i.groupme.com/433x462.png.683979cae2ec42eebf0ad11c12d39c44"
  }];
  postMessage(body, options);
}

// "Show me canonical"
function handleCanonical(body, options) {
  body.text = "Canonical";
  postMessage(body, options);
}

// "Show me the best fucking sexion"
function handleBestSexion(body, options) {
  body.text = "Now don't you forget it";
  body.attachments = [{
    "type" : "image",
    "url" : "https://i.groupme.com/2048x1366.jpeg.aed485572983429290b68b483240386f"
  }];
  postMessage(body, options);
}

// Post message to groupme API
function postMessage(body, options) {
  var botResponse = body.text;

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
