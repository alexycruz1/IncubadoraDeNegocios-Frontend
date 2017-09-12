import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default {
    getAdvertisements() {
        return Vue.http.get(url + 'getAdvertisements');
    },

    createAdvertisement(newAdvertisement) {
        Vue.http.post(url + 'Advertisement', newAdvertisement);
    },

    editAdvertisement(updatedFields, IDAdvertisement) {
        Vue.http.put(url + 'Advertisement/' + IDAdvertisement, updatedFields);
    },

    deleteAdvertisement(IDAdvertisement) {
        Vue.http.delete(url + 'Advertisement/' + IDAdvertisement);
    },

    getAdvertisementByName(AdvertisementByName) {
        return Vue.http.get(url + 'AdvertisementByName/' + AdvertisementByName);
    },
}