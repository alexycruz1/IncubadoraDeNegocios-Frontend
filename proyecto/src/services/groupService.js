import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://incubate1.herokuapp.com/IDN/';

export default{
	createGroup(newGroup){
		return Vue.http.post(url+'Group',newGroup);
	},
	getAllGroups(){
		return Vue.http.get(url+'Groups');
	},
	updateGroup(newGroup,idGroup){
		return Vue.http.put(url+'Group/' + idGroup,newGroup);
	},
	deleteGroup(idGroup){
		return Vue.http.delete(url + 'Group/' + idGroup);
	},
	addMember(member,idGroup){
		return Vue.http.put(url + 'addGroupMember/' + idGroup,member);
	},
	removeMember(member,idGroup){
		return Vue.http.put(url + 'removeGroupMember/' + idGroup,member);
	},
	addEvent(event,idGroup){
		return Vue.http.put(url + 'addGroupEvent/' + idGroup,event);
	},
	removeEvent(event,idGroup){
		return Vue.http.put(url + 'removeGroupEvent/' + idGroup,event);
	},
	getGroupById(idGroup){
		return Vue.http.get(url + 'Group/' + idGroup);
	}
}