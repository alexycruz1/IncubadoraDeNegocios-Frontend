import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default{
	getAllBusiness(){
		return Vue.http.get(url + 'getBusiness');
	}
}