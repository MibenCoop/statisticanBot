import TelegramBot from 'node-telegram-bot-api';
import request from 'request';
import fetch from 'node-fetch';
import axios from 'axios'
const TOKEN = '573448570:AAFYdmnoaPz9nkosrdHMaagIk1nJGpqAsTc';
const url = 'https://4312341a.ngrok.io';
// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN, { polling: true});



bot.on('message', msg => {
  if ( msg.text !== "/start" && msg.text !== "/getMessages") {
    const body = { msg };
    fetch('http://localhost:3000/api/bot', { 
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    bot.sendMessage(msg.chat.id, "Your message has been saved");
  }
});

bot.onText(/\/start/, function (msg, match) {
    const fromId = msg.from.id;
    const resp = "Hello. I am bot and can help you to get all statistics from your account"
    bot.sendMessage(fromId, resp);
});

bot.onText(/\/getMessages/, function (msg, match) {
  const fromId = msg.from.id;
  //Заглушка. Админ реализован через ник
  console.log('body',msg.chat.username)
  if ( msg.chat.username == "VitaliyBelmach") {
    axios.get('http://localhost:3000/api/bot')
    .then(res => 
      {
       return bot.sendMessage(fromId, `Messages: ${Array.from(res.data.messages).length}`)
      });;
    }
});
