import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default{
	createGroup(newGroup){
		Vue.http.post(url+'createGroup',newGroup).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	getAllGroups(){
		return Vue.http.get(url+'getGroups');
	},
	updateGroup(newGroup,idGroup){
		return Vue.http.put(url+'updateGroup/' + idGroup,
			newGroup).then(response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	deleteGroup(idGroup){
		Vue.http.delete(url + 'deleteGroup/' + idGroup).then(response => {
				alert('Exito');
			},response => {
				alert('Error');
			});
	},
	addMember(member,idGroup){
		Vue.http.put(url + 'addGroupMember/' + idGroup,member).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	removeMember(member,idGroup){
		Vue.http.put(url + 'removeGroupMember/' + idGroup,member).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	addEvent(event,idGroup){
		Vue.http.put(url + 'addGroupEvent/' + idGroup,event).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	removeEvent(event,idGroup){
		Vue.http.put(url + 'removeGroupEvent/' + idGroup,event).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	getGroupById(idGroup){
		return Vue.http.get(url + 'getGroupById/' + idGroup);
	}
}