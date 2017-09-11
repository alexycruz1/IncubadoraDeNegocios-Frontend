<template>
	<div id = "profile">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui fluid card" v-for = "user of users">
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
        					<div class="ui basic green button">Modiifcar</div>
      					</span>
    				</div>
				</div>
			</div>
			<div class = "one wide column">
				<div class = "ui vertical divider"></div>
			</div>
			<div class = "seven wide column">
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
        						<div class="ui basic green button">Modiifcar</div>
        						<div class="ui basic red button">Eliminar</div>
      						</div>
    					</div>
					</div>
				</div>
			</div>
			<div class = "one wide column"></div>	
		</div>
		<br>
	</div>
</template>

<script >
	import personService from './../services/personServices'
	import businessService from './../services/businessService'
	var business = [];
	var people = [];
	var person;

	personService.getPersonById(2).then(response => {
		people.push(response.body[0]);
		person = response.body[0];
		for(let i = 0; i < person.business.length; i++){
		businessService.getBusinessById(person.business[i]).then(
			response =>{
				console.log(response.body[0]);
				business.push(response.body[0]);
			}, response => {
				alert('Error');
			});
	}
	},response => {
		alert('Error');
	});

	
	export default {
		name: 'profile',
		data(){
			return {
				listOfBusiness: business,
				users: people
			};
		},
		methods: {
		}
	}
</script>
<style scoped>
	
</style>