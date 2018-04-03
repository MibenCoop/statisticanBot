const TOKEN = '573448570:AAFYdmnoaPz9nkosrdHMaagIk1nJGpqAsTc';
const TelegramBot = require('node-telegram-bot-api');
const url = 'https://4312341a.ngrok.io';
const request = require('request');
const fetch = require('node-fetch');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN, { polling: true});



bot.on('message', msg => {
  console.log('msg', msg)
  const body = { msg };
  fetch('http://localhost:3000/api/bot', { 
      method: 'POST',
      body:    JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(json => console.log(json));
  if ( msg.text !== "/start") {
    bot.sendMessage(msg.chat.id, "Your message has been saved");
  }
});

bot.onText(/\/start/, function (msg, match) {
    const fromId = msg.from.id;
    const resp = "Hello. I am bot and can help you to get all statistics from your account"
    bot.sendMessage(fromId, resp);
});
