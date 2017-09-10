import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default{
	createTask(newTask){
		Vue.http.post(url+'createTask', newTask).then(response => {
			alert('Exito');
		}, response => {
			alert('Error');
		});
	}, 

	getAllTasks(){
		return Vue.http.get(url + 'getTasks');
	},

	updateTask(newTask,idTask){
		Vue.http.put(url + 'updateTask/' + idTask,newTask).then(
			response=>{
				alert('Exito');
			},response=>{
				alert('Error');
			});
	},
	deleteTask(idTask){
		Vue.http.delete(url+'deleteTask/' + idTask).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	getTasksByAdviser(idAdviser){
		return Vue.http.get(url + 'getTasksByAdviser/' + idAdviser);
	},
	getTasksByBusiness(idBusiness){
		return Vue.http.get(url + 'getTasksByBusiness/' + idBusiness);
	},
	getTasksByAdviserAndBusiness(idAdviser,idBusiness){
		return Vue.http.get(url + 'getTasksByAdviserAndBusiness/' + idAdviser + ','+idBusiness);
	}

}