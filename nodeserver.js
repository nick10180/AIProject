var htmldoc = '<!DOCTYPE html><!--Created 10-12-23, by Nicholas Pullara--><!--HTML for a website that integrates OpenAI api.--><html><head><link rel="stylesheet" href="styles.css" type="text/css" /></head><title>OpenAI Integration Test</title><body><h1>Sandbox</h1><p class="chatbottextbox" id="chatbottext"></p><p2><form action="/" method="post"><textarea id="usertext" name="usertext" placeholder="Enter your message..." size=500 onkeyup="countChar(this)"></textarea><input type="submit" name="submitbutton" id="submitbutton" value="submitbutton"></button></form></p2></body></html>'

//Don't mind the whole html document sitting up here... it's a dirty hack.

const path = require('node:path');
const hostname = "127.0.0.1";
const port = 3001;
var express = require("express")
const app = express();
const bodyParser = require('body-parser')
const cheerio = require('cheerio');
const fs = require('fs');


app.use('/', express.static(path.join(__dirname, '')));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send(htmldoc);
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + "/" + "style.css");
});


app.post('/', async function (req, res) {
  const $ = cheerio.load(htmldoc)

  const message = req.body.usertext;
  console.log(message);
  const completed = await getAIResponse(message);
  console.log("Completed: " + completed);
  $('p').text(completed)
  res.send($.html());


});



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




async function getAIResponse(mes) {


  //console.log("Reached write");
  console.log("User Message: " + mes);

  const messagebody = {
    "messages": [
      {
        "role": "user",
        "content": mes
      }
    ],
    "mode": "instruct",
    "instruction_template": "Alpaca",
  }

  const fetch = require("node-fetch");


  // If you want to use OpenAI, uncomment this section and comment the next section
  //I havent tested this with OpenAI but it should work the same.
  ////////////////////////////////////////////////////////////
  // import OpenAI from "openai";
  // const openai = new OpenAI();
  // const completion = await openai.chat.completions.create({
  // "messages": [
  //    {
  //       "role": "user",
  //       "content": mes
  //     }
  //   ],
  //   model: "gpt-3.5-turbo",
  // });
  // return(completion.choices[0])

  
  //And here is where I lost several hours of my life, until ChatGPT rescued me and taught my how to use async the right way.
  const response = await fetch('http://127.0.0.1:5000/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify(messagebody),
    headers: { 'Content-Type': 'application/json' },
  })


  const json = await response.json();
  var choice = json.choices[0];
  console.log(choice.message.content);
  return choice.message.content;

}
