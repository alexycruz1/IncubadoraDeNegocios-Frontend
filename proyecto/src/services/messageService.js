import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default{
	createMessage(newMessage){
		Vue.http.post(url + 'createMessage', newMessage).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	getAllMessages(){
		return Vue.http.get(url + 'getMessages');
	},
	getMessageById(idMessage){
		return Vue.http.get(url + 'getMessageById/' + idMessage);
	}
}