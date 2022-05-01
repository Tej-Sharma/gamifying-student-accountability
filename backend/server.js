// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')("ACe9c0638e7e63afb1078da19476317d3f", "5e45b21d82b757f761f26152d8856c62");


var express = require('express');
const bodyParser = require("body-parser");
var app = express();

// Configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.post('/sendMessages', function(req, res) {
  console.log(req.body);
  // sendAllMessages(req.body.numbers, req.body.messageToSend);
  res.send("You just called the post method at '/hello'!\n");
});

app.listen(3000);

const sendMessage = (number, messageBody) => {
    client.messages
    .create({
       body: messageBody,
       from: '+19894814693',
       to: number
     })
    .then(message => console.log(message.messageBody))
    .catch(error => console.log(error))
}


const sendAllMessages = (numbers, messageBody) => {
    numbers.forEach(number => {
        sendMessage(number, messageBody)
    });
} 

// sendAllMessages(["+14845579287", "+12016009948"], "solo leveling");