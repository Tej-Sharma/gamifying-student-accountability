// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')("ACe9c0638e7e63afb1078da19476317d3f", "5e45b21d82b757f761f26152d8856c62");

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+19894814693',
     to: '+12016009948'
   })
  .then(message => console.log(message.sid));
