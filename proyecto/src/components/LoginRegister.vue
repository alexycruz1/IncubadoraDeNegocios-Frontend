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

	</div>
</template>

<script>
	import personService from './../services/personServices'


export default {
  name: 'LoginRegister',

  methods: {
      Register(){
		var newUser = {IDPerson: Number, username: this.username, password: this.password, scope: ["admin"], name: this.firstName + " " + this.lastName, age: "", 
					email: this.email, phone: "", profession: "", address: "", image: "img/fondo2.jpg", isAdviser: this.adviser, listOfFriends: [Number], 
					listOfGroups: [Number], listOfEvents: [Number], listOfBusiness: [Number]};

					console.log(newUser);
		personService.createPerson(newUser).then(response =>{
        }, response =>{
          	alert('Error');
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
