<template>
	<div id = "LoginRegister">

		<div class = "TopSpace">
		</div>

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
			allBusiness: []	
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
      Register(){
		var newUser = {IDPerson: Number, username: this.username, password: this.password, scope: ["admin"], name: this.firstName + " " + this.lastName, age: "", 
					email: this.email, phone: "", profession: "", address: "", image: "", isAdviser: this.adviser, listOfFriends: [Number], 
					listOfGroups: [Number], listOfEvents: [Number], listOfBusiness: [Number]};

		this.userRegistered = newUser;

		personService.createPerson(newUser).then(response =>{
        }, response =>{
          	alert('Error');
        });
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

			var newBusiness = {idBusiness: Number, name: this.bName, code: bCode, location: this.bLocation, 
							description: this.bDescription, image: input, idOwners: [Number], tasks: [Number]};

			newBusiness.idOwners.push(this.userRegistered.IDPerson);

			businessService.createBusiness(newBusiness).then(response => {
				alert('business created');

				personService.addBusiness({business: newBusiness.idBusiness}, userRegistered.IDPerson).then(response => {
					alert('business added to person');
				}, response => {
					alert('Error adding business to person');
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
		margin-left: 5%;
	}

	.SpaceBetweenButton {
		margin-top: 5%;
		margin-left: 25%;
	}

	.TopSpace {
		margin-bottom: 8%;
	}

	.BottomSpace {
		margin-top: 8%;
	}
</style>
