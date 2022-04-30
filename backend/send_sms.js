// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')("ACe9c0638e7e63afb1078da19476317d3f", "5e45b21d82b757f761f26152d8856c62");

//TODO: add dotenv

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
        console.log("nj")
    });
} 

sendAllMessages(["+14845579287", "+12016009948"], "solo leveling");