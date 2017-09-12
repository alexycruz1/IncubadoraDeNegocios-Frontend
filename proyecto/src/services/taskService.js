import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/IDN/';

export default{
	createTask(newTask){
		Vue.http.post(url+'Task', newTask).then(response => {
			alert('Exito');
		}, response => {
			alert('Error');
		});
	}, 

	getAllTasks(){
		return Vue.http.get(url + 'Tasks');
	},

	updateTask(newTask,idTask){
		Vue.http.put(url + 'Task/' + idTask,newTask).then(
			response=>{
				alert('Exito');
			},response=>{
				alert('Error');
			});
	},
	deleteTask(idTask){
		Vue.http.delete(url+'Task/' + idTask).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	getTasksByAdviser(idAdviser){
		return Vue.http.get(url + 'TasksByAdviser/' + idAdviser);
	},
	getTasksByBusiness(idBusiness){
		return Vue.http.get(url + 'TasksByBusiness/' + idBusiness);
	},
	getTasksByAdviserAndBusiness(idAdviser,idBusiness){
		return Vue.http.get(url + 'TasksByAdviserAndBusiness/' + idAdviser + ','+idBusiness);
	}

}