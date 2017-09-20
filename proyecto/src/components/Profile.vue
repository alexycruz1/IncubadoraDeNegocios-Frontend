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
				<div class = "ui big message" v-show = "!user.isAdviser">
					Perfil de Empresas 
					<div class = "ui right floated icon buttons">
						<button class = "ui blue button" v-on:click = "showCreateBusinessModal()">
							<i class = "plus icon"></i>	
						</button>
					</div>
				</div>
				<div class = "ui big message" v-show = "user.isAdviser">
					Empresas Asesoradas
				</div>
				<div class = "ui two cards" style="overflow-y:scroll;max-height: 400px;">
					<div class = "ui fluid card" v-for = "element of listOfBusiness">
						<div class="ui black ribbon label">{{element.name}}</div>
						<div class="image">
      						<img v-bind:src="element.image">
    					</div>
    					<div class="content">
      						
      						<div class="meta">
        						<a>{{element.location}}</a>
      						</div>
      						<div class="description">
      							{{element.description}}
      						</div>
    					</div>
    					<div class="extra content" v-show = "!user.isAdviser">
      						<div class="ui two buttons">
        						<div class="ui basic green button"
        						v-on:click = "showBusinessModal(element)">Modiifcar</div>
        						<div class="ui basic red button" v-on:click = "showDeleteModal(element)">Abandonar</div>
      						</div>
    					</div>
    					<div class = "extra content" v-show = "user.isAdviser">
    						<div class="ui basic red button" v-on:click = "showDeleteModal(element)">Dejar de Asesorar</div>
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
						<div class = "ui medium image" v-on:click = "uploadImg()">
							<img v-bind:src="currentBusiness.image">
						</div>
					</div>
				</div>
				<div class = "seven wide column">
					<div class = "ui form">
						<div class = "field">
							<label><a >Nombre</a></label>
							<input type="text"  v-model = "currentBusiness.name">
						</div>
						<div class = "field">
							<label><a >Ubicacion</a></label>
							<input type="text" v-model = "currentBusiness.location">
						</div>
						<div class = "field">
							<label><a >Descripcion</a></label>
							<input type="text"  v-model = "currentBusiness.description">
						</div>
					</div>
				</div>
			</div>
			<div class="actions">
				
    			<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui black button" v-on:click = "showUsersM()">
      				Agregar Fundador
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
						<div class = "ui medium image" v-on:click = "uploadImg2()">
							<img v-bind:src="currentUser.image" id = "uImage">
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

		<div class = "ui modal" id = "usersM">
			<i class = "close icon"></i>
			<div class = "header">
				Seleccione un usuario
			</div>
			<div class = "content">
				<div class = "ui four cards">
					<div class = "red card" v-for = "u in allUsers" v-on:click = "setNewOwner(u)">
						<div class = image>
							<img v-bind:src="u.image">
						</div>
						<div class = "center aligned content">
							{{u.name}}
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class = "ui modal" id = "createBusiness">
			<i class = "close icon"></i>
			<div class = "header">
				Agregar empresa
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image" v-on:click = "uploadImg3()">
						<img v-bind:src="newBusiness.image" id = "businessImage1">
					</div>
				</div>
				<div class = "seven wide column">
				<br><br><br>
					<div class = "ui form">
						<div class = "field">
							<label>Nombre:</label>
							<input type="text" v-model = "newBusiness.name">
						</div>
						<div class = "field">
							<label>direccion:</label>
							<input type="text" v-model = "newBusiness.location">
						</div>
						<div class = "field">
							<label>descripcion:</label>
							<input type="text" v-model = "newBusiness.description">
						</div>
					</div>
				</div>
			</div>
			<div class = "actions">
				<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "createBusiness()">
      				Crear
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>
	</div>
</template>

<script >
	import personService from './../services/personServices'
	import businessService from './../services/businessService'
	var input = 'nada';

	export default {
		name: 'profile',
		data(){
			return {
				allUsers: [],
				listOfBusiness: [],
				user: {},
				currentBusiness: {
					image: 'img/imageNo.jpg',
					name: '', 
					description: '',
					location:''
				},
				newBusiness: {
					image: 'img/imageNo.jpg',
					name: '', 
					description: '',
					location:''
				},
				currentUser:Object,
				newOwner: Object
			};
		},
		methods: {
			uploadImg(){
				input = document.createElement("INPUT");
				input.setAttribute("type", "file");
				input.click();
				input.onchange = this.setImage
			},
			setImage(){
				input = input.value;
				input = input.substring(12, input.length);
				input = 'img/' + input;
				console.log('Input: ', input);
				this.currentBusiness.image = input;
				console.log('Input2: ', this.currentBusiness.image);
				$("#businessImage").attr("src", input);
			},
			uploadImg2(){
				input = document.createElement("INPUT");
				input.setAttribute("type", "file");
				input.click();
				input.onchange = this.setImage2
			},
			setImage2(){
				input = input.value;
				input = input.substring(12, input.length);
				input = 'img/' + input;
				console.log('Input: ', input);
				this.currentUser.image = input;
				console.log('Input2: ', this.currentUser.image);
				$("#uImage").attr("src", input);
			},
			uploadImg3(){
				input = document.createElement("INPUT");
				input.setAttribute("type", "file");
				input.click();
				input.onchange = this.setImage3
			},
			setImage3(){
				input = input.value;
				input = input.substring(12, input.length);
				input = 'img/' + input;
				console.log('Input: ', input);
				this.newBusiness.image = input;
				console.log('Input2: ', this.newBusiness.image);
				$("#businessImage1").attr("src", input);
			},
			showBusinessModal(element){
				this.currentBusiness = {};
				this.currentBusiness = element;
				console.log('Empresa: ', element);
				console.log('Empresa2: ', this.currentBusiness);
				this.getAllUsers();
				$('#empresa').modal('show');
			},
			showCreateBusinessModal(){
				$('#createBusiness').modal('show');
			},
			createBusiness(){
				this.listOfBusiness = [];
				console.log('NeBusiness: ',this.newBusiness);
				businessService.createBusiness(this.newBusiness).then(response => {
					businessService.getAllBusiness().then(response => {
						console.log('Response: ', response.body);
						businessService.addOwner({owner: this.user.IDPerson}, response.body[response.body.length -1].idBusiness).then(response => {

						}, response => {
							alert('Error');
						});
						personService.addBusiness({business: response.body[response.body.length -1].idBusiness},this.user.IDPerson).then(response => {
							personService.getPersonById(this.user.IDPerson).then(response => {
								this.user = response.body[0];

								for(let i = 0; i < this.user.listOfBusiness.length; i++){
									businessService.getBusinessById(this.user.listOfBusiness[i]).then(response => {
										this.listOfBusiness.push(response.body[0]);
									},response => {
										alert('Error');
									});
								}
							}, response => {
								alert('ERROR');
							});
						}, response => {
							alert('Error');
						});
					}, response => {
						alert('Error');
					});
				}, response => {
					alert('Error creating');
				});
			},
			getAllUsers(){
				this.allUsers = [];
				personService.getPeople().then(response=>{
						for(let i = 0; i < response.body.length; i++){
							if(response.body[i].isAdviser === false){
								this.allUsers.push(response.body[i]);
							}
						}
					}, response=>{
						alert('Error');
				});
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
						alert('Ya es miembro');
					}
				}
				if(!alreadyOwner){
					this.newOwner = element;
					alert('No Era Miemrbo');
					this.modifyBusiness();
				}
				$('#usersM').modal('hide');
			},
			dropDown(){
				$('#menu').dropdown();
			},
			showUsersM(){
				$('#usersM').modal('show');
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
				personService.getPersonById(this.user.IDPerson).then(response => {
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
			personService.getPersonById(localStorage.getItem('idUser')).then(response => {
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