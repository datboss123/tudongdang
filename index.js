var clientid = "WQlr8pEY1VYVvA";
var cliensecret="bS3e352-TdoXxnZuJp0EfkK2tC8";
var refreshtoken="588567144325-eqA1PYbQMpPm18jIvrFIiRZHHH0";
var fbtoken = "EAAJylRI8qBwBAMHihhq3RAEBwwsGM4XLbxTfIl6VKUTwk4xSI4WmPZAZAhiKlDkOigPt9QuS3WikFCZCwIzVpN87nChoOYCEjZBvZCIVGW9RenKo48wccqCMtxphlTcECS96vMsKkZBZCmlsKTv79c3kGVcdrZAPtdMMM8jiyNtkZBAZDZD"
const fetch = require("node-fetch");
const snoowrap = require("snoowrap");
require("dotenv").config();

(async () => {
  try {
    // Config Snoowrap
    const r = new snoowrap({
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
      clientId: clientid,
      clientSecret: cliensecret,
      refreshToken: refreshtoken
    });

    // Get Sub Reddit
    const subReddit = r.getSubreddit("listentothis");

    // Get Random post
    const randomPost = await subReddit.getRandomSubmission();
    
 
  
    const access_token = fbtoken;
    const messageData = {
      url: randomPost.url,
      author: randomPost.author.name,
      title: randomPost.title
    };
    const messageTemplate = `Listen and enjoy to this song ${messageData.title} | Credit: ${messageData.author}
  `;
    const url = `https://graph.facebook.com/v5.0/111036847435477/feed?message=${messageTemplate}&link=${messageData.url}&access_token=${access_token}`;
    const postStatus = await fetch(url, {
      method: "POST"
    });
    const response = await postStatus.json();
    console.log(response);
} catch (error) {
    console.error(error);
  }


})();
