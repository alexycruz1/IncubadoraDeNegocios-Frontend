import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://incubate1.herokuapp.com/IDN/';

export default {
    getChats() {
        return Vue.http.get(url + 'Chats');
    },

    createChat(newChat) {
        return Vue.http.post(url + 'Chat', newChat);
    },

    deleteChat(IDChat) {
        return Vue.http.delete(url + 'Chat/' + IDChat);
    },
    
    getChatByID(chatByID) {
        return Vue.http.get(url + 'ChatByID/' + chatByID);
    },

    addPersonToChat(newPerson, IDChat) {
        return Vue.http.put(url + 'PersonToChat/' + IDChat, newPerson);
    },

    deletePersonInChat(person, IDChat) {
        return Vue.http.put(url + 'PersonInChat/' + IDChat, person);
    },

    addMessageToChat(newMessage, IDChat) {
        return Vue.http.put(url + 'MessageToChat/' + IDChat, newMessage);
    },

    deleteMessageInChat(message, IDChat) {
        return Vue.http.put(url + 'MessageInChat/' + IDChat, message);
    }
}