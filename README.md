
# Scrap

Scrapping Facebook with JavaScript.


See it working below.

[![Scrap](http://img.youtube.com/vi/xIlrF2RF_UY/0.jpg)](http://www.youtube.com/watch?v=xIlrF2RF_UY)

# How to use

Go to a Facebook page where there's a list of peopke with pictures of them. e.g.: someone's friends, group participants...

Open the console. In Chrome is ```ctrl + shift + j```

Copy and paste the script, hit enter.

Wait. As my internet is kinda slow, I choose a 3 second time interval between each page scroll, to give it more time to load; but you can change that.

## How it works

The script rolls the page (friends, groups... page that has a list of people with pictures) until the end, getting the name and profile picture address of everyone; then dumps as JSON file - ```{"name": "picture address"}```.
