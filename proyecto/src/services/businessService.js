import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/';

export default{
	getAllBusiness(){
		return Vue.http.get(url + 'getBusiness');
	},
	createBusiness(business){
		Vue.http.post(url + 'createBusiness',business).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
		});
	},
	updateBusiness(updatedFields,idBusiness){
		Vue.http.put(url + 'updateBusiness/' + idBusiness,updatedFields).then(
				response => {
					alert('Exito');
				},
				response =>{
					alert('Error');
				}
			)
	},
	deleteBusiness(idBusiness){
		Vue.http.delete(url + 'deleteBusiness/' + idBusiness).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	getBusinessByCode(id){
		return Vue.http.get(url + 'getBusinessByCode/' + id);
	},
	addOwner(newOwner,idBusiness){
		Vue.http.put(url + 'addBusinessOwner/' + idBusiness,newOwner).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	removeOwner(deletedOwner,idBusiness){
		Vue.http.put(url + 'removeBusinessOwner/' + idBusiness,deletedOwner).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	}, 
	getBusinessById(idBusiness){
		return Vue.http.get(url + 'getBusinessById/' + idBusiness);
	}
}