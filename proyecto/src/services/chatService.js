import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default {
    getChats() {
        return Vue.http.get(url + 'getChats');
    },

    createChat(newChat) {
        Vue.http.post(url + 'createChat', newChat).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deleteChat(IDChat) {
        Vue.http.delete(url + 'deleteChat/' + IDChat).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    addPersonToChat(newPerson, IDChat) {
        Vue.http.put(url + 'addPersonToChat/' + IDChat, newPerson).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deletePersonInChat(person, IDChat) {
        Vue.http.put(url + 'deletePersonInChat/' + IDChat, person).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    addMessageToChat(newMessage, IDChat) {
        Vue.http.put(url + 'addMessageToChat/' + IDChat, newMessage).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deleteMessageInChat(message, IDChat) {
        Vue.http.put(url + 'deleteMessageInChat/' + IDChat, message).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },    
}