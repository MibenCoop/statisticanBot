import TelegramBot from 'node-telegram-bot-api';
import request from 'request';
import fetch from 'node-fetch';
import axios from 'axios'
import api from './api'
import { TOKEN, PASSWORD, START, HELP } from './constants'
const bot = new TelegramBot(TOKEN, { polling: true});

bot.on('message', msg => {
  if ( !isCommand(msg.text) ) {
    const body = { msg };
    fetch('http://localhost:8080/api/bot', { 
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
  const resp = START;
    bot.sendMessage(fromId, resp);
  }); 
  
  bot.onText(/\/help/, function (msg, match) {
    const fromId = msg.from.id;
  const resp = HELP;
  bot.sendMessage(fromId, resp);
}); 

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
  else if (password === undefined ) {
    bot.sendMessage(fromId, "Use space and password after this command")
  }
  else { 
    bot.sendMessage(fromId, "Invalid password") 
  }
})

const getMessages = (admin, fromId) => {
  if (admin === true ) {
    api.messages.getMessages()
    .then(res => bot.sendMessage(fromId, `Messages: ${res.length}`))
    .catch(err => bot.semdMessage(fromId, err))
  } else {
    bot.sendMessage(fromId, "You don't have administrator rights")
  }
}

const isCommand = (text) => 
  (text.match(/\/(.+)/) === null) ? false : true;

  



  


  
