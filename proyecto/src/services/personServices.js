import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default {
    getPeople() {
        return Vue.http.get(url + 'getPeople');
    },

    createPerson(newPerson) {
        Vue.http.post(url + 'createPerson', newPerson).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    editPerson(updatedFields, IDPerson) {
        Vue.http.put(url + 'IDN/editPerson/' + IDPerson, updatedFields).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    deletePerson(IDPerson) {
        Vue.http.delete(url + 'deletePerson/' + IDPerson).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    getPersonByName(personByName) {
        return Vue.http.get(url + 'getPersonByName/' + personByName);
    },

    getPersonByUsername(personByUsername) {
        return Vue.http.get(url + 'getPersonByUsername/' + personByUsername);
    },

    getPersonByAge(PersonByAge) {
        return Vue.http.get(url + 'getPersonByAge/' + PersonByAge);
    },

    getPersonByEmail(PersonByEmail) {
        return Vue.http.get(url + 'getPersonByEmail/' + PersonByEmail);
    },

    getPersonByPhone(PersonByPhone) {
        return Vue.http.get(url + 'getPersonByPhone/' + PersonByPhone);
    },

    getPersonByProfession(PersonByProfession) {
        return Vue.http.get(url + 'getPersonByProfession/' + PersonByProfession);
    },

    getPersonByAddress(PersonByAddress) {
        return Vue.http.get(url + 'getPersonByAddress' + PersonByAddress);
    },

    addFriend(newFriend, IDPerson) {
        Vue.http.put(url + 'addFriend/' + IDPerson, newFriend).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deleteFriend(friend, IDPerson) {
        Vue.http.put(url + 'deleteFriend/' + IDPerson, friend).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },
    
    addGroup(newGroup, IDPerson){
        Vue.http.put(url + 'addGroupToPerson/' + IDPerson, newGroup).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deleteGroup(group, IDPerson){
        Vue.http.put(url + 'deleteGroupFromPerson/' + IDPerson, group).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    addEvent(newEvent, IDPerson){
        Vue.http.put(url + 'addEventToPerson/' + IDPerson, newEvent).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deleteEvent(event, IDPerson){
        Vue.http.put(url + 'deleteEventFromPerson/' + IDPerson, event).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    addBusiness(newBusiness, IDPerson){
        Vue.http.put(url + 'addBusinessToPerson/' + IDPerson, newBusiness).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    deleteBusiness(business, IDPerson){
        alert('Person');
        Vue.http.put(url + 'deleteBusinessFromPerson/' + IDPerson, business).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },
    getPersonById(IDPerson){
        return Vue.http.get(url + 'getPersonById/' + IDPerson);
    }
}
