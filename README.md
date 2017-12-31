# Overview:
GroupMe Bot that, once complete, will deliver LSJUMB Altoz charts upon request

# Commands:
Searches for a chart of your song or uses string ops to try to guess which chart you're looking for
```
Show me [song]
```

Returns a list of available chartz
```
Show me list
```

Returns troubleshooting tips
```
Show me help
```

Returns the location of the shak
```
Show me where
```

For a surprise :D
```
Show me a surprise
```

# Steps for uploading new chartz:
1. Download PDF chartz from online folder and save to local directory

2. Convert all PDF files into jpeg images
```
$ mkdir Newimage
$ for filename in *.pdf; do convert -density 300 -depth 8 -quality 85 "$filename" "Newimage/${filename%.*}.jpg"; done
```

3. Locally obtain all groupme image service URLs for chartz (I used a python script to handle all this at once)
```
$ curl https://image.groupme.com/pictures -X "POST" -H "X-Access-Token: [token]" -H "Content-Type: image/[filetype]" --data-binary @[filename]
```

4. Update the "songs" array in the image_links.json file with your new song and groupme url as follows
```
url = {
    "songs": 
    [
    ...
        {
            "title": [your_song],
            "url": [your_url]
        },
    ...
    ]
}
```

# More Information:
GroupMe API info: https://dev.groupme.com

Deployed using heroku: https://heroku.com

Starter code courtesy https://github.com/groupme/bot-tutorial-nodejs#get-bot-id