var fs = require('fs');
var data = fs.readFileSync('./image_links.json');
var url = JSON.parse(data);
const MAX_CHARS = 450;

module.exports = {
    getList: function() {
		return "https://i.groupme.com/1028x1492.png.2262fcab0f6c490f8eb36780698e24bf";
    },

    getURL: function(imageName) {
        if (imageName.toLowerCase() == "arn") imageName = "All Right Now";
        if (imageName.toLowerCase() == "fun fun fun") imageName = "Ffun";
        imageName = imageName.toLowerCase();
        imageName = imageName.replace(/\s+/g, '');
        imageName = imageName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\'’]/g,'');
        var possibleURL = "";
        for (var i = 0; i < url.songs.length; i++) {
            if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]\'’/g,'') == imageName) return url.songs[i].url;
            else if (url.songs[i].title.toLowerCase().replace(/\s+/g, '').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()’]/g,'').indexOf(imageName) != -1) possibleURL = url.songs[i].url;
        }
        return possibleURL;
    },

    // getPossibleSpellings: function(imageName) {

    // }
};
