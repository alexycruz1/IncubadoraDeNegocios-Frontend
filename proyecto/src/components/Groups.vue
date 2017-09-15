<template>
	<div id = "Groups">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">
					Mis Grupos    
					<div class = "ui right floated icon buttons">
						<button class = "ui blue button" v-on:click = "showCreateGModal()">
							<i class = "plus icon"></i>	
						</button>
					</div>
					
				</div>
				<div class = "ui two cards">
					<div class = "ui fluid card" v-for = "group in groups" >
						<div class = "image" v-on:click = "showGroupInfo(group)">
							<img v-bind:src="group.image">
						</div>
						<div class = "content">
							<div class = "header">{{group.name}}</div>
							<div class = "meta">
								<a>{{group.state}}</a>
							</div>
						</div>
						<div class="extra content">
      						<div class="ui two buttons">
        						<div class="ui basic green button"
        						>Info</div>
        						<div class="ui basic red button" v-on:click = "showQuitModal(group)">Eliminar</div>
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
				<div class = "ui fluid floated segment" v-show = "showInfo">
					<div class = "ui top attached label">
						Miembros
						<div class = "ui right floated icon buttons">
							<button class = "ui blue button" v-on:click = "showUsersModal()">
								<i class = "plus icon"></i>	
							</button>
						</div>
					</div>
					<br><br><br>
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
				<div class = "ui fluid floated segment" v-show = "showInfo">
					<div class = "ui top attached label">
						Eventos
						<div class = "ui right floated icon buttons">
							<button class = "ui blue button">
								<i class = "plus icon"></i>	
							</button>
						</div>
					</div>
					<br><br><br>
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

		<div class = "ui mini modal" id = "quit">
			<i class = "close icon"></i>
			<div class = "header">Desea Eliminar?</div>
			<div class = "extra content">
				<div class="actions">
    				<div class="ui black deny button">
      					Cancelar
    				</div>
    				<div class="ui red right labeled icon button" v-on:click = "quitGroup()">
      					Eliminar
      					<i class="checkmark icon"></i>
    				</div>
 		 		</div>
			</div>
		</div>
		<div class = "ui modal" id = "usersModal">
			<i class = "close icon"></i>
			<div class = "header">
				Seleccione un usuario
			</div>
			<div class = "content">
				<div class = "ui four cards">
					<div class = "red card" v-for = "u in allUsers" v-on:click = "addMember(u)">
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
		<div class = "ui modal" id = "create">
			<i class = "close icon"></i>
			<div class = "header">
				Creacion de Grupos
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image">
						<img src="img/fondo2.jpg">
					</div>
				</div>
				<div class = "seven wide column">
				<br><br><br>
					<div class = "ui form">
						<div class = "field">
							<label>Nombre: </label>
							<input type="text" placeholder= "nombre" v-model = "newGroup.name">
						</div>
						<div class = "field">
							<label>Estado: </label>
							<input type="text" placeholder= "estado" v-model  = "newGroup.state">
						</div>
					</div>
				</div>
			</div>
			<div class = "actions">
				<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "createGroup()">
      				Crear
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>
	</div>
</template>

<script >
	import groupService from './../services/groupService'
	import personService from './../services/personServices'
	import eventService from './../services/EventService'
	
	export default{
		name: 'groups', 
		data(){
			return {
				user:{},
				groups: [],
				currentGroup: Object,
				usersOfCurrentGroup: [],
				eventsOfCurrentGroup: [],
				showInfo: false,
				allUsers: [],
				newGroup: {
					image: 'img/fondo2.jpg', 
					name: '',
					state: ''
				}
			}
		}, 
		methods:{
			quitGroup(){
				this.showInfo = false;
				personService.deleteGroup({group: this.currentGroup.idGroup},this.user.IDPerson).then(response => {
					alert('Exito');
					}, response => {
						alert('Error');
					});
				groupService.removeMember({member: this.user.IDPerson},this.currentGroup.idGroup).then(response => {
						alert('Exitos');
					}, response => {
						alert('Error');
					});
					this.refreshCards();
			},
			refreshCards(){
				this.user = {};
				this.groups = [];
				this.showInfo = false;

				personService.getPersonById(2).then(response => {
				this.user = response.body[0];

			for(let i = 0; i < this.user.listOfGroups.length; i++){
				groupService.getGroupById(this.user.listOfGroups[i]).then(response => {
					this.groups.push(response.body[0]);
				}, response => {
					alert('Error getting group');
				});
			}
			}, response => {
				alert('Error');
			});
			},
			showGroupInfo(element){
				this.showInfo = true;
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
			},
			showQuitModal(element){
				this.currentGroup = element;
				$('#quit').modal('show');
			},
			showUsersModal(){
				this.allUsers = [];
				this.getAllUsers();
				$('#usersModal').modal('show');
			},
			showCreateGModal(){
				$('#create').modal('show');
			},
			getAllUsers(){
				personService.getPeople().then(response => {
					for(let i = 0; i < response.body.length; i++){
						if(!this.verifyId(response.body[i].IDPerson)){
							this.allUsers.push(response.body[i]);
						}else{
							console.log('Ya esta');
						}
					}
				}, response => {
					alert('Error');
				});
			},
			verifyId(id){
				for(let i = 0; i < this.currentGroup.members.length; i++){
					if(id === this.currentGroup.members[i]){
						return true;
					}
				}
				return false;
			}, 
			addMember(element){
				this.usersOfCurrentGroup = [];
				personService.addGroup({group: this.currentGroup.idGroup}, element.IDPerson).then(response => {
					alert('Exito');
				}, response => {
					alert('Error');
				});
				groupService.addMember({member: element.IDPerson},this.currentGroup.idGroup).then(response => {
					alert('Exito');
					this.refreshCards();
				}, response => {
					alert('Error');
				});
				$('#usersModal').modal('hide');
			},
			createGroup(){
				groupService.createGroup(this.newGroup).then(response=>{
					groupService.getAllGroups().then(response => {
						personService.addGroup({group: response.body[response.body.length -1].idGroup}, this.user.IDPerson).then(response=>{
							alert('Exito');
						},response => {
							alert('Error');
						});
						groupService.addMember({member: this.user.IDPerson},response.body[response.body.length -1].idGroup).then(response => {
							alert('Exito');
							this.refreshCards();
						}, response => {
							alert('Error');
						});
					}, response => {
						alert('Error');
					});
				}, response => {
					alert('Error');
				});
			}
		},
		beforeCreate(){
			personService.getPersonById(2).then(response => {
			this.user = response.body[0];

			for(let i = 0; i < this.user.listOfGroups.length; i++){
				groupService.getGroupById(this.user.listOfGroups[i]).then(response => {
					this.groups.push(response.body[0]);
				}, response => {
					alert('Error getting group');
				});
			}

			}, response => {
				alert('Error');
			});
		},
		watch: {
			usersOfCurrentGroup(){
				//this.refreshCards();
				//this.showGroupInfo(this.currentGroup);
			}
		}
	}
</script>

<style scoped>
	
</style>