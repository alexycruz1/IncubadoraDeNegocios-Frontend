<template>
	<div id = "LoginRegister">

		<div class = "TopSpace">
		</div>

		<div class = "ui one column centered grid">
			<div class = "ten wide column">
				<div class = "ui two centered cards">
					<div class="ui centered card">
  						<div class="content">
    						<h2>Be great at what you do</h2>
							<h4 class = "centerTitles">Get started - it's free.</h4>
  						</div>
  			
						<div class="content">
    						<div class="ui large left icon input SpaceBetweenDivs">
      							<i class="user icon"></i>
      							<input v-model="firstName" type="text" placeholder="Primer Nombre">
    						</div>

							<div class="ui large left icon input SpaceBetweenDivs">
      							<i class="user icon"></i>
      							<input v-model="lastName" type="text" placeholder="Primer Apellido">
    						</div>

							<div class="ui large left icon input SpaceBetweenDivs">
      							<i class="user icon"></i>
      							<input v-model="email" type="text" placeholder="Correo electronico">
    						</div>

							<div class="ui large left icon input SpaceBetweenDivs">
      							<i class="user icon"></i>
      							<input v-model="username" type="text" placeholder="Nombre de usuario">
    						</div>

							<div class="ui large left icon input SpaceBetweenDivs">
      							<i class="user icon"></i>
      							<input v-model="password" type="password" placeholder="Contraseña">
    						</div>

							<div class="ui action input SpaceBetweenDivs">
  								<input type="text" disabled="" id = "ProfileImageInput">
  								<button class="ui teal right labeled icon button" v-on:click = "uploadProfileImage()">
    								<i class="image icon"></i>
    									Upload
  								</button>
							</div>

							<div class="ui toggle checkbox SpaceBetweenDivs">
  								<input v-model="adviser" type="checkbox" name="public">
  								<label>Asesor</label>
							</div>

							<div class = "SpaceBetweenButton">
								<button class="medium ui blue button" v-on:click = "Register()">
 									Registrarse!
								</button>
							</div>
  						</div>
					</div>
				</div>
			</div>
		</div>

		

		<div class = "BottomSpace">
		</div>

		<div class = "ui modal" id = "createBusiness">
			<i class = "close icon"></i>
			<div class = "header">
				Agregar empresa
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image" v-on:click = "uploadImg()">
						<img src="img/imageNo.jpg" id = "businessImage">
					</div>
				</div>
				<div class = "seven wide column">
				<br><br><br>
					<div class = "ui form">
						<div class = "field">
							<label>Nombre:</label>
							<input type="text" v-model = "bName">
						</div>
						<div class = "field">
							<label>direccion:</label>
							<input type="text" v-model = "bLocation">
						</div>
						<div class = "field">
							<label>descripcion:</label>
							<input type="text" v-model = "bDescription">
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

<script>
	import personService from './../services/personServices'
	import businessService from './../services/businessService'

	var input = 'nada';

export default {
	name: 'LoginRegister',
	data(){
		return {
			userRegistered: Object,
			allBusiness: [],
			businessRegistered: Object,
			profileImage: 'Click here to add a profile image'
		}
	},
  methods: {
	  uploadImg(){

		input = document.createElement("INPUT");
		input.setAttribute("type", "file");
		input.click();

		input.onchange = function () {
			input = this.value;
			input = input.substring(12, input.length);
			input = "img/" + input;

			$("#businessImage").attr("src", input);	
		};
	},
	uploadProfileImage(){

		input = document.createElement("INPUT");
		input.setAttribute("type", "file");
		input.click();

		input.onchange = function () {
			input = this.value;
			input = input.substring(12, input.length);
			input = "img/" + input;

			this.profileImage = input;
			document.getElementById('ProfileImageInput').value = this.profileImage;
		};
	},
	showModal(){
			$('#createBusiness').modal('show');
		},
      Register(){

		  if(this.isAdviser != true){
			  this.isAdviser = false;
		  }

		var newUser = {username: this.username, password: this.password, scope: ["admin"], 
						name: this.firstName + " " + this.lastName, age: "", email: this.email, 
						phone: "", profession: "", address: "", image: input, isAdviser: this.adviser};

		console.log(newUser);

		this.userRegistered = newUser;

		personService.createPerson(newUser).then(response =>{
			console.log('La creo');
			personService.getPeople().then(response => {
				for(let i = 0; i < response.body.length; i++){
					if(i === response.body.length - 1){
						var tempUser = response.body[i];
						localStorage.setItem('idUser', tempUser.IDPerson);
					}
				}
			}, response => {
				alert('Error getting people');
			});
        }, response =>{
          	alert('Error');
        });
		this.showModal();
    },
	createBusiness(){
		businessService.getAllBusiness().then(response => {
			for(let i = 0; i < response.body.length; i++){
				this.allBusiness.push(response.body[i]);
			}

			var bCode = "";

			for (let i = 0; i < 5; i++) {
				var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    			bCode += possible.charAt(Math.floor(Math.random() * possible.length));
			}

			var available = true;

			for(let i = 0; i < this.allBusiness.length; i++){
				if(this.allBusiness[i].code === bCode){
					available = false;
				}
			}

			while(!available){
				for (let i = 0; i < 5; i++) {
					var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    				bCode += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				for(let i = 0; i < this.allBusiness.length; i++){
					if(this.allBusiness[i].code === bCode){
						available = false;
					}else{
						available = true;
					}
				}		
			}

			var newBusiness = {name: this.bName, code: bCode, location: this.bLocation, 
							description: this.bDescription, image: input};

			this.businessRegistered = newBusiness;

			businessService.createBusiness(newBusiness).then(response => {
				alert('business created');

				businessService.getAllBusiness().then(response => {
					this.allBusiness = [];

					for(let i = 0; i < response.body.length; i++){
						if(i === response.body.length - 1){
							this.businessRegistered = response.body[i];
						}
					}

					personService.getPeople().then(response => {
					for(let i = 0; i < response.body.length; i++){
						if(i === response.body.length - 1){
							this.userRegistered = response.body[i];
						}
					}


					personService.addBusiness({business: this.businessRegistered.idBusiness}, this.userRegistered.IDPerson).then(response => {
					alert('business added to person');
					console.log('Empresa: ' + this.businessRegistered.idBusiness);
					console.log('Persona: ' + this.userRegistered.IDPerson);
				}, response => {
					alert('Error adding business to person');
				});

				businessService.addOwner({owner: this.userRegistered.IDPerson}, this.businessRegistered.idBusiness).then(response => {
					alert('Owner added to business');
					console.log('Empresa: ' + this.businessRegistered.idBusiness);
					console.log('Persona: ' + this.userRegistered.IDPerson);
				}, response => {
					alert('Owner cant be added');
				});
				}, response => {
					alert('person cant be found');
				});

				
				}, response => {
					alert('business cant be found');
				});
			}, response => {
				alert('Error creating business');
			});

		}, response => {
			alert('Error getting business');
		});
	}
  }
}
</script>

<style>
	.centerTitles{
		text-align: center;
	}

	.SpaceBetweenDivs{
		margin-bottom: 2%;
		margin-left: 20%;
	}

	.SpaceBetweenButton {
		margin-top: 5%;
		margin-left: 35%;
	}

	.TopSpace {
		margin-bottom: 8%;
	}

	.BottomSpace {
		margin-top: 8%;
	}
</style>
