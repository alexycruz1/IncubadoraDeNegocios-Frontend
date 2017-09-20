import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://incubate1.herokuapp.com/IDN/';

export default{
	createTask(newTask){
		return Vue.http.post(url+'Task', newTask);
	}, 

	getAllTasks(){
		return Vue.http.get(url + 'Tasks');
	},

	updateTask(newTask,idTask){
		return Vue.http.put(url + 'Task/' + idTask,newTask);
	},
	deleteTask(idTask){
		return Vue.http.delete(url+'Task/' + idTask);
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