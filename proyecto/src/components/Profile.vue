<template>
	<div id = "profile">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">
					Perfil Personal
				</div>
				
				<div class = "ui fluid card">
					<div class="image">
      					<img v-bind:src="user.image">
    				</div>
    				<div class="content">
      					<div class="header">{{user.name}}</div>
      					<div class="meta">
        					<a> Email: {{user.email}}</a><br>
        					<a> Telefono: {{user.phone}}</a><br>
      					</div>
      					<div class="description">
      						<a> Profesion: {{user.profession}}</a><br>
      						<a> Edad: {{user.age}}</a><br>
      						<a >Direccion: {{user.address}}</a><br>
      					</div>
    				</div>
    				<div class="extra content">
      					<span class="right floated">
        					<div class="ui basic green button" v-on:click = "showUserModal(user)">Modiifcar</div>
      					</span>
    				</div>
				</div>
				
			</div>
			<div class = "one wide column">
				<div class = "ui vertical divider"></div>
			</div>
			<div class = "seven wide column">
				<div class = "ui big message">
					Perfil de Empresas
				</div>
				<div class = "ui two cards">
					<div class = "ui fluid card" v-for = "element of listOfBusiness">
						<div class="image">
      						<img v-bind:src="element.image">
    					</div>
    					<div class="content">
      						<div class="header">{{element.name}}</div>
      						<div class="meta">
        						<a>{{element.location}}</a>
      						</div>
      						<div class="description">
      							{{element.description}}
      						</div>
    					</div>
    					<div class="extra content">
      						<div class="ui two buttons">
        						<div class="ui basic green button"
        						v-on:click = "showBusinessModal(element)">Modiifcar</div>
        						<div class="ui basic red button" v-on:click = "showDeleteModal(element)">Eliminar</div>
      						</div>
    					</div>
					</div>
				</div>
			</div>
			<div class = "one wide column"></div>

		</div>
		<br>

		<div class = "ui modal" id = "empresa">
			<i class = "close icon"></i>
			<div class = "header">Modificacion</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "image content">
						<div class = "ui medium image">
							<img v-bind:src="currentBusiness.image">
						</div>
					</div>
				</div>
				<div class = "seven wide column">
					<div class = "ui form">
						<div class = "field">
							<label><a >Nombre</a></label>
							<input type="text" v-bind:value = "currentBusiness.name" v-model = "currentBusiness.name">
						</div>
						<div class = "field">
							<label><a >Ubicacion</a></label>
							<input type="text" v-bind:value="currentBusiness.location" v-model = "currentBusiness.location">
						</div>
						<div class = "field">
							<label><a >Descripcion</a></label>
							<input type="text" v-bind:value="currentBusiness.description" v-model = "currentBusiness.description">
						</div>
					</div>
				</div>
			</div>
			<div class="actions">
				<div id = "menu" class = "ui dropdown" >
					<i class = "add user icon" v-on:click = "dropDown()"></i>
					<div class = "text" v-on:click = "dropDown()"> Agregar nuevo Fundador</div>
					<i class = "dropdown icon" v-on:click = "dropDown()"></i>
					<div class = "menu">
						<div class = "item" v-for = "allUser of allUsers" v-on:click = "setNewOwner(allUser)">
							<img clas = "ui avatar image" v-bind:src="allUser.image">
							{{allUser.name}}
						</div>	
					</div>
				</div>
    			<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button"
    			v-on:click = "modifyBusiness()">
      				Modificar
      				<i class="checkmark icon"></i>
    			</div>
 		 	</div>
		</div>

		<div class = "ui modal" id = "usuario">
			<i class = "close icon"></i>
			<div class = "header">Modificacion</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "image content">
						<div class = "ui medium image">
							<img v-bind:src="currentUser.image">
						</div>
					</div>
				</div>
				<div class = "seven wide column">
					<div class = "ui form">
						<div class = "field">
							<label><a >Nombre</a></label>
							<input type="text" v-bind:value = "currentUser.name" v-model = "currentUser.name">
						</div>
						<div class = "field">
							<label><a >Usuario</a></label>
							<input type="text" v-bind:value = "currentUser.username" v-model = "currentUser.username">
						</div>
						<div class = "field">
							<label><a >Edad</a></label>
							<input type="text" v-bind:value="currentUser.age" v-model = "currentUser.age">
						</div>
						<div class = "field">
							<label><a >Email</a></label>
							<input type="text" v-bind:value="currentUser.email" v-model = "currentUser.email">
						</div>
						<div class = "field">
							<label><a >Telefono</a></label>
							<input type="text" v-bind:value = "currentUser.phone" v-model = "currentUser.phone">
						</div>
						<div class = "field">
							<label><a >Profesion</a></label>
							<input type="text" v-bind:value = "currentUser.profession" v-model = "currentUser.profession">
						</div>
						<div class = "field">
							<label><a >Direccion</a></label>
							<input type="text" v-bind:value = "currentUser.address" v-model = "currentUser.address">
						</div>	
					</div>
				</div>
			</div>
			<div class="actions">
    			<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button"
    			v-on:click = "modifyUser()">
      				Modificar
      				<i class="checkmark icon"></i>
    			</div>
 		 	</div>
		</div>

		<div class = "ui mini modal" id = "deleteBusiness">
			<i class = "close icon"></i>
			<div class = "header">Desea Eliminar?</div>
			<div class = "extra content">
				<div class="actions">
    				<div class="ui black deny button">
      					Cancelar
    				</div>
    				<div class="ui red right labeled icon button" v-on:click = "deleteBusinessFromList()">
      					Eliminar
      					<i class="checkmark icon"></i>
    				</div>
 		 		</div>
			</div>
		</div>
	</div>
</template>

<script >
	import personService from './../services/personServices'
	import businessService from './../services/businessService'
	var business = [];
	var people = [];
	var person;

	

	export default {
		name: 'profile',
		data(){
			return {
				allUsers: [],
				listOfBusiness: [],
				user: {},
				currentBusiness: Object,
				currentUser:Object,
				newOwner: Object
			};
		},
		methods: {
			showBusinessModal(element){
				console.log('Empresa: ', element);
				personService.getPeople().then(response=>{
						this.allUsers = response.body;
					}, response=>{
						alert('Error');
				});
				this.currentBusiness = element;
				$('#empresa').modal('show');
			},
			showUserModal(element){
				this.currentUser = element;
				$('#usuario').modal('show');
			},
			showDeleteModal(element){
				this.currentBusiness = element;
				$('#deleteBusiness').modal('show');
			},
			setNewOwner(element){
				let alreadyOwner = false;
				for(let i = 0; i < this.currentBusiness.idOwners.length; i++){
					if(this.currentBusiness.idOwners[i] === element.IDPerson){
						alreadyOwner = true;
						console.log('Ya es');
					}
				}
				if(!alreadyOwner){
					this.newOwner = element;
					console.log('NoEra')
				}
			},
			dropDown(){
				$('#menu').dropdown();
			},
			modifyBusiness(){
				businessService.updateBusiness(this.currentBusiness,this.currentBusiness.idBusiness).then(response=>{
					if(this.newOwner.IDPerson!=undefined){
						businessService.addOwner({owner: this.newOwner.IDPerson},this.currentBusiness.idBusiness).then(response =>{
							alert('Exito');
						}, response => {
							alert('Error');
						});

						personService.addBusiness({business: this.currentBusiness.idBusiness},this.newOwner.IDPerson).then(response =>{
							alert('Exito');
						}, response => {
							alert('Error');
						});
					}
					alert('Exito');
				}, response => {
					alert('Error');
				});
			},
			modifyUser(){
				personService.editPerson(this.currentUser,this.user.IDPerson).then(response=>{
					alert('Exito');
				}, response => {
					alert('Error');
				});
			},
			deleteBusinessFromList(){
				var obj = [{business: this.currentBusiness.idBusiness},{owner:this.user.IDPerson}];

				businessService.removeOwner(obj[1],this.currentBusiness.idBusiness).then(response=>{
					alert('Exito');
				}, response => {
					alert('Error');
				});

				personService.deleteBusiness(obj[0],this.user.IDPerson).then(response=>{
					alert('Exito');
				}, response => {
					alert('Error');
				});

				this.refreshCards();
			}, 
			refreshCards(){
				personService.getPersonById(this.users[0].IDPerson).then(response => {
					this.listOfBusiness = [];
					this.user = response.body[0];
					for(let i = 0; i < this.user.listOfBusiness.length; i++){
					businessService.getBusinessById(this.user.listOfBusiness[i]).then(
					response =>{
						this.listOfBusiness.push(response.body[0]);
					}, response => {
						alert('Error');
				});
				}
				},response => {
					alert('Error');
				});
			}
		},
		beforeCreate(){
			personService.getPersonById(3).then(response => {
				this.user = response.body[0];
				for(let i = 0; i < this.user.listOfBusiness.length; i++){
				businessService.getBusinessById(this.user.listOfBusiness[i]).then(
					response =>{
					this.listOfBusiness.push(response.body[0]);
				}, response => {
					alert('Error');
				});
			}
			},response => {
				alert('Error');
			});
		}
	}	
</script>
<style scoped>
	h1{
		color: white;
	}
</style>