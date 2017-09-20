import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://incubate1.herokuapp.com/IDN/';

export default {
    getPeople() {
        return Vue.http.get(url + 'People');
    },

    createPerson(newPerson) {
        return Vue.http.post(url + 'Person', newPerson);
    },

    editPerson(updatedFields, IDPerson) {
        return Vue.http.put(url + 'Person/' + IDPerson, updatedFields);
    },

    deletePerson(IDPerson) {
        return Vue.http.delete(url + 'Person/' + IDPerson);
    },

    getPersonByName(personByName) {
        return Vue.http.get(url + 'Person/' + personByName);
    },

    addFriend(newFriend, IDPerson) {
        return Vue.http.put(url + 'addFriend/' + IDPerson, newFriend);
    },

    deleteFriend(friend, IDPerson) {
        return Vue.http.put(url + 'deleteFriend/' + IDPerson, friend);
    },
    
    addGroup(newGroup, IDPerson){
        return Vue.http.put(url + 'GroupToPerson/' + IDPerson, newGroup);
    },

    deleteGroup(group, IDPerson){
        return Vue.http.put(url + 'GroupFromPerson/' + IDPerson, group);
    },

    addEvent(newEvent, IDPerson){
        return Vue.http.put(url + 'EventToPerson/' + IDPerson, newEvent);
    },

    deleteEvent(event, IDPerson){
        return Vue.http.put(url + 'EventFromPerson/' + IDPerson, event);
    },

    addBusiness(newBusiness, IDPerson){
        return Vue.http.put(url + 'BusinessToPerson/' + IDPerson, newBusiness);
    },

    deleteBusiness(business, IDPerson){
        console.log(business);
        return Vue.http.put(url + 'BusinessFromPerson/' + IDPerson, business);
    },
    addRequest(newRequest, IDPerson){
        return Vue.http.put(url + 'RequestToPerson/' + IDPerson, newRequest);
    },

    deleteRequest(request, IDPerson){
        return Vue.http.put(url + 'RequestFromPerson/' + IDPerson, request);
    },
    getPersonById(IDPerson){
        return Vue.http.get(url + 'PersonById/' + IDPerson);
    }
}
