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

    deleteEvent(IDEvent) {
        Vue.http.delete(url + 'deleteEvent/' + IDEvent).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    getEventByName(eventByName) {
        return Vue.http.get(url + 'getEventByName/' + eventByName);
    },

    getEventByID(eventByID) {
        return Vue.http.get(url + 'getEventByID/' + eventByID);
    },

    editEvent(updatedFields, IDEvent) {
        Vue.http.put(url + 'editEvent/' + IDEvent, updatedFields).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    addPersonToEvent(newPerson, IDEvent) {
        Vue.http.put(url + 'addPersonToEvent/' + IDEvent, newPerson).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deletePersonInEvent(person, IDEvent) {
        Vue.http.put(url + 'deletePersonInEvent/' + IDEvent, person).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },
}
