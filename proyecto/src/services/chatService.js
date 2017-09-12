import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/IDN/';

export default {
    getChats() {
        return Vue.http.get(url + 'Chats');
    },

    createChat(newChat) {
        Vue.http.post(url + 'Chat', newChat);
    },

    deleteChat(IDChat) {
        Vue.http.delete(url + 'Chat/' + IDChat);
    },
    
    getChatByID(chatByID) {
        return Vue.http.get(url + 'ChatByID/' + chatByID);
    },

    addPersonToChat(newPerson, IDChat) {
        Vue.http.put(url + 'PersonToChat/' + IDChat, newPerson);
    },

    deletePersonInChat(person, IDChat) {
        Vue.http.put(url + 'PersonInChat/' + IDChat, person);
    },

    addMessageToChat(newMessage, IDChat) {
        Vue.http.put(url + 'MessageToChat/' + IDChat, newMessage);
    },

    deleteMessageInChat(message, IDChat) {
        Vue.http.put(url + 'MessageInChat/' + IDChat, message);
    }
}