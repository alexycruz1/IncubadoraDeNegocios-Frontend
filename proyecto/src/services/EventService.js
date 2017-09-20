import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://incubate1.herokuapp.com/IDN/';

export default {
    getEvents() {
        return Vue.http.get(url + 'Events');
    },

    createEvent(newEvent) {
        return Vue.http.post(url + 'createEvent', newEvent);
    },

    deleteEvent(IDEvent) {
        return Vue.http.delete(url + 'Event/' + IDEvent);
    },

    getEventByName(eventByName) {
        return Vue.http.get(url + 'EventByName/' + eventByName);
    },

    getEventByID(eventByID) {
        return Vue.http.get(url + 'EventByID/' + eventByID);
    },

    editEvent(updatedFields, IDEvent) {
        return Vue.http.put(url + 'Event/' + IDEvent, updatedFields);
    },

    addPersonToEvent(newPerson, IDEvent) {
        return Vue.http.put(url + 'PersonToEvent/' + IDEvent, newPerson);
    },

    deletePersonInEvent(person, IDEvent) {
        return Vue.http.put(url + 'PersonInEvent/' + IDEvent, person);
    }
}
