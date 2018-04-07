import TelegramBot from 'node-telegram-bot-api';
import request from 'request';
import fetch from 'node-fetch';
import axios from 'axios'
import api from './api'
const TOKEN = '573448570:AAFYdmnoaPz9nkosrdHMaagIk1nJGpqAsTc';
const bot = new TelegramBot(TOKEN, { polling: true});
const PASSWORD = "1234";


/* bot.on('message', msg => {
  if ( msg.text !== "/start" && msg.text !== "/getMessages" && msg.text !== "/setAdmin") {
    const body = { msg };
    fetch('http://localhost:8080/api/bot', { 
        method: 'POST',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    bot.sendMessage(msg.chat.id, "Your message has been saved");
  }
}); */

bot.onText(/\/start/, function (msg, match) {
    const fromId = msg.from.id;
    const resp = "Hello. I am bot and can help you to get all statistics from your account"
    bot.sendMessage(fromId, resp);
}); 

const getMessages = (admin, fromId) => {
  if (admin === true ) {
    api.messages.getMessages()
      .then(res => bot.sendMessage(fromId, `Messages: ${res.length}`))
      .catch(err => bot.semdMessage(fromId, err))
  } else {
    bot.sendMessage(fromId, "You don't have administrator rights")
  }
}

bot.onText(/\/getMessages/, function (msg, match) {
  const fromId = msg.from.id;
  api.admin.getAdmin(msg)
    .then(res => getMessages(res, fromId))
    .catch(err => console.log('err',err))
}); 

bot.onText(/\/setAdmin/, function(msg, match) {
  const fromId = msg.from.id;
  const password = (match.input).split(" ")[1];
  if ( password === PASSWORD) {
    api.admin.setAdmin(msg)
      .then(res => bot.sendMessage(fromId, res))
      .catch(err => bot.sendMessage(fromId, err))
  }
  else { bot.sendMessage(fromId, "Invalid password") }
})









