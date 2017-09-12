<template>
	<div id = "Groups">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">
					Mis Grupos
				</div>
				<div class = "ui two cards">
					<div class = "ui fluid card" v-for = "group of groups" v-on:click = "showGroupInfo(group)">
						<div class = "image">
							<img v-bind:src="group.image">
						</div>
						<div class = "content">
							<div class = "header">{{group.name}}</div>
							<div class = "meta">
								<a>{{group.state}}</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class = "one wide column">
				<div class = "ui vertical divider"></div>
				</div>
			<div class = "seven wide column">
				<div class = "ui big message">
					Informacion de Grupo
				</div>
				<div class = "ui fluid floated segment">
					<div class = "ui top attached label">
						Miembros
					</div>
					<div class = "ui two cards">
						<div class = "ui fluid card" v-for = "user in usersOfCurrentGroup">
							<div class = "ui fluid image">
								<img v-bind:src="user.image">
							</div>
							<div class = "content">
								<div class = "header">
									{{user.name}}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class = "ui fluid floated segment">
					<div class = "ui top attached label">
						Eventos
					</div>
					<div class = "ui two cards">
						<div class = "ui fluid card" v-for = "event in eventsOfCurrentGroup">
							<div class = "ui fluid image">
								<img v-bind:src="event.image">
							</div>
							<div class = "content">
								<div class = "header">
									{{event.name}}
								</div>
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
	import groupService from './../services/groupService'
	import personService from './../services/personServices'
	import eventService from './../services/EventService'
	
	var loggedUser = [];
	var allUserGroups = [];

	personService.getPersonById(3).then(response => {
		loggedUser.push(response.body[0]);

		for(let i = 0; i < loggedUser[0].listOfGroups.length; i++){
			groupService.getGroupById(loggedUser[0].listOfGroups[i]).then(response => {
				allUserGroups.push(response.body[0]);
			}, response => {
				alert('Error getting group');
			});
		}

	}, response => {
		alert('Error');
	})

	export default{
		name: 'groups', 
		data(){
			return {
				user: loggedUser,
				groups: allUserGroups,
				currentGroup: Object,
				usersOfCurrentGroup: [],
				eventsOfCurrentGroup: [],
				showInfo: false
			}
		}, 
		methods:{
			showGroupInfo(element){
				this.usersOfCurrentGroup = [];
				this.eventsOfCurrentGroup = [];
				this.currentGroup = element;
				//Get Members
				for(let i = 0; i < element.members.length; i++){
					personService.getPersonById(element.members[i]).then(response =>{
						this.usersOfCurrentGroup.push(response.body[0]);
					}, response => {
						alert('Error');
					});
				}

				//Get Events
				for(let i = 0; i < element.events.length; i++){
					eventService.getEventByID(element.events[i]).then(response => {
						console.log('Eventos: ', response.body[0]);
						this.eventsOfCurrentGroup.push(response.body[0]);
					}, response => {
						alert('Error');
					});
				}
			}
		}
	}
</script>

<style scoped>
	
</style>