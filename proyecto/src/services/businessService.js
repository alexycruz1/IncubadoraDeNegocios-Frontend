import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'http://localhost:8000/IDN/';

export default{
	getAllBusiness(){
		return Vue.http.get(url + 'Business');
	},
	createBusiness(business){
		Vue.http.post(url + 'Business',business).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
		});
	},
	updateBusiness(updatedFields,idBusiness){
		console.log('Llefa');
		Vue.http.put(url + 'Business/' + idBusiness,updatedFields).then(
				response => {
					alert('Exito');
				},
				response =>{
					alert('Error');
				}
			)
	},
	deleteBusiness(idBusiness){
		Vue.http.delete(url + 'Business/' + idBusiness).then(
			response => {
				alert('Exito');
			}, response => {
				alert('Error');
			});
	},
	getBusinessByCode(id){
		return Vue.http.get(url + 'BusinessByCode/' + id);
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
		return Vue.http.get(url + 'BusinessById/' + idBusiness);
	}
}