import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default {
    getAdvertisements() {
        return Vue.http.get(url + 'getAdvertisements');
    },

    createAdvertisement(newAdvertisement) {
        Vue.http.post(url + 'createAdvertisement', newAdvertisement).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        });
    },

    editAdvertisement(updatedFields, IDAdvertisement) {
        Vue.http.put(url + 'editAdvertisement/' + IDAdvertisement, updatedFields).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    deleteAdvertisement(IDAdvertisement) {
        Vue.http.delete(url + 'deleteAdvertisement/' + IDAdvertisement).then(response => {
            alert('Exito');
        }, response => {
            alert('Error');
        })
    },

    getAdvertisementByName(AdvertisementByName) {
        return Vue.http.get(url + 'getAdvertisementByName/' + AdvertisementByName);
    },
}