import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/IDN/';

export default{
	createMessage(newMessage){
		return Vue.http.post(url + 'Message', newMessage);
	},
	getAllMessages(){
		return Vue.http.get(url + 'Messages');
	},
	getMessageById(idMessage){
		return Vue.http.get(url + 'MessageById/' + idMessage);
	}
}