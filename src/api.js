import axios from "axios";

export default {
  messages: {
    getMessages: () =>
        axios.get('http://localhost:8080/api/bot')
        .then(res => res.data.messages)
        .catch(err => "К сожалению, сервер в данный момент недоступен")

  },
  admin: {
    getAdmin: msg => 
        axios.post("http://localhost:8080/api/admin/getAdmin", {msg})
            .then(res => res.data.admin)
            .catch(err => err),
    setAdmin: msg => 
        axios.post("http://localhost:8080/api/admin/setAdmin", {msg})
            .then(res => res.data.answer)
            .catch(err => err.response.data.errors)
        
    }
};