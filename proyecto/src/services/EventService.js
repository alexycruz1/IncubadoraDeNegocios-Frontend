import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/IDN/';

export default {
    getEvents() {
        return Vue.http.get(url + 'Events');
    },

    createEvent(newEvent) {
        Vue.http.post(url + 'createEvent', newEvent).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deleteEvent(IDEvent) {
        Vue.http.delete(url + 'Event/' + IDEvent).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    getEventByName(eventByName) {
        return Vue.http.get(url + 'EventByName/' + eventByName);
    },

    getEventByID(eventByID) {
        return Vue.http.get(url + 'EventByID/' + eventByID);
    },

    editEvent(updatedFields, IDEvent) {
        Vue.http.put(url + 'Event/' + IDEvent, updatedFields).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    addPersonToEvent(newPerson, IDEvent) {
        Vue.http.put(url + 'PersonToEvent/' + IDEvent, newPerson).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deletePersonInEvent(person, IDEvent) {
        Vue.http.put(url + 'PersonInEvent/' + IDEvent, person).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },
}
