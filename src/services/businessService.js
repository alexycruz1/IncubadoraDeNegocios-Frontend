import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);
var url = 'https://incubate1.herokuapp.com/IDN/';

export default{
	getAllBusiness(){
		return Vue.http.get(url + 'Business');
	},
	createBusiness(business){
		 return Vue.http.post(url + 'Business',business);
	},
	updateBusiness(updatedFields,idBusiness){
		console.log('Llefa');
		return Vue.http.put(url + 'Business/' + idBusiness,updatedFields);
	},
	deleteBusiness(idBusiness){
		return Vue.http.delete(url + 'Business/' + idBusiness);
	},
	getBusinessByCode(id){
		return Vue.http.get(url + 'BusinessByCode/' + id);
	},
	addOwner(newOwner,idBusiness){
		return Vue.http.put(url + 'addBusinessOwner/' + idBusiness,newOwner);
	},
	removeOwner(deletedOwner,idBusiness){
		return Vue.http.put(url + 'removeBusinessOwner/' + idBusiness,deletedOwner);
	}, 
	getBusinessById(idBusiness){
		return Vue.http.get(url + 'BusinessById/' + idBusiness);
	}
}