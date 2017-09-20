<template>
	<div id = "Groups">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				
					<div class = "ui big message">
						Mis Grupos
						<div class = "ui right floated icon buttons">
						<div class="ui icon buttons">
	 		 				<button class="ui icon positive button" v-on:click = "showCreateGModal()">
								<i class = "plus icon"></i>
							</button>
							<div class="or">
							</div>
							<button class="ui button" v-on:click = "showGroupsModal()">
								<i class = "search icon"></i>
							</button>
						</div>
					</div>
					</div>

					


				<div class = "ui two cards" style="overflow-y:scroll;max-height: 400px;">
					<div class = "ui fluid card" v-for = "group in groups" >
						<div class = "ui black ribbon label">{{group.name}}</div>
						<div class = "image" v-on:click = "showGroupInfo(group)">
							<img v-bind:src="group.image">
						</div>
						<div class="extra content">
      						<div class="ui two buttons">
        						<div class="ui basic green button" v-on:click = "showModifyModal(group)"
        						>Modificar</div>
        						<div class="ui basic red button" v-on:click = "showQuitModal(group)">Salir</div>
      						</div>
    					</div>
					</div>
				</div>
			</div>
			<div class = "one wide column">
				<div class = "ui vertical divider"></div>
				</div>
			<div class = "seven wide column">
				<div class = "ui black segment">
					<div class = "ui left floated header">
						<h1>Informacion de grupo</h1>
					</div>

					<div class = "spacedSegment"></div>
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
					<div class = "ui two cards" style="overflow-y:scroll;height: 200px;">
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
							<button class = "ui blue button" v-on:click = "showCreateEventModal()">
								<i class = "plus icon"></i>	
							</button>
						</div>
					</div>
					<br><br><br>
					<div class = "ui two cards" style="overflow-y:scroll;max-height: 300px;">
						<div class = "ui fluid card" v-for = "event in eventsOfCurrentGroup">
							<div class = "ui fluid image">
								<img v-bind:src="event.image">
							</div>
							<div class = "content">
								<div class = "header">
									{{event.name}}
								</div>
								<div class = "meta">
									{{event.dateAndTime}}
								</div>
							</div>
							<div class="extra content">
      							<div class="ui two buttons">
        							<div class="ui basic green button" v-on:click = "showModifyEventModal(event)"
        							>Modificar</div>
        							<div class="ui basic red button" v-on:click = "showDeleteEventModal(event)">Eliminar</div>
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
					<div class = "ui medium image" v-on:click = "uploadImg()">
						<img v-bind:src="newGroup.image" id = "cGroups">
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
		<div class = "ui modal" id = "modify">
			<i class = "close icon"></i>
			<div class = "header">
				Modificacion de Grupos
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image" v-on:click = "uploadImg2()">
						<img v-bind:src="currentGroup.image" id = "mGroups"> 
					</div>
				</div>
				<div class = "seven wide column">
				<br><br><br>
					<div class = "ui form">
						<div class = "field">
							<label>Nombre: </label>
							<input type="text" v-bind:value= "currentGroup.name" v-model = "currentGroup.name">
						</div>
						<div class = "field">
							<label>Estado: </label>
							<input type="text" v-bind:value= "currentGroup.state" v-model  = "currentGroup.state">
						</div>
					</div>
				</div>
			</div>
			<div class = "actions">
				<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "modifyGroup()">
      				Modificar
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>
		<div class = "ui modal" id = "createEvent2">
			<i class = "close icon"></i>
			<div class = "header">
				Creacion de Eventos
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image" v-on:click = "uploadImg3()">
						<img v-bind:src="event.image" id = "cEvents">
					</div>
				</div>
				<div class = "seven wide column">
				<br><br><br>
					<div class = "ui form">
						<div class = "field">
							<label>Nombre: </label>
							<input type="text" placeholder= "nombre" v-model = "event.name">
						</div>
						<div class = "field">
							<label>Estado: </label>
							<input type="text" placeholder= "estado" v-model  = "event.status">
						</div>
						<div class = "field">
							<label>descripcion: </label>
							<input type="text" placeholder= "Descripcion" v-model  = "event.description">
						</div>
						<div class = "field">
							<label>Fecha: </label>
							<input type="text" placeholder= "Fecha" v-model  = "event.dateAndTime">
						</div>
					</div>
				</div>
			</div>
			<div class = "actions">
				<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "createEvent2()">
      				Crear
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>
		<div class = "ui mini modal" id = "quitEvent2">
			<i class = "close icon"></i>
			<div class = "header">Desea Eliminar?</div>
			<div class = "extra content">
				<div class="actions">
    				<div class="ui black deny button">
      					Cancelar
    				</div>
    				<div class="ui red right labeled icon button" v-on:click = "deleteEvent2()">
      					Eliminar
      					<i class="checkmark icon"></i>
    				</div>
 		 		</div>
			</div>
		</div>
		<div class = "ui modal" id = "modifyEvent2">
			<i class = "close icon"></i>
			<div class = "header">
				Modificacion de Eventos
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image" v-on:click = "uploadImg3()">
						<img v-bind:src="event.image" id = "mEvents">
					</div>
				</div>
				<div class = "seven wide column">
				<br><br><br>
					<div class = "ui form">
						<div class = "field">
							<label>Nombre: </label>
							<input type="text" v-bind:value = "event.name" v-model = "event.name">
						</div>
						<div class = "field">
							<label>Estado: </label>
							<input type="text" v-bind:value= "event.status" v-model  = "event.status">
						</div>
						<div class = "field">
							<label>descripcion: </label>
							<input type="text" v-bind:value= "event.description" v-model  = "event.description">
						</div>
						<div class = "field">
							<label>Fecha: </label>
							<input type="text" v-bind:value= "event.dateAndTime" v-model  = "event.dateAndTime">
						</div>
					</div>
				</div>
			</div>
			<div class = "actions">
				<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "modifyEvent2()">
      				Modificar
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>
		<div class = "ui modal" id = "groupsModal">
			<i class = "close icon"></i>
			<div class = "header">
				Seleccione un grupo
			</div>
			<div class = "content">
				<div class = "ui four cards">
					<div class = "red card" v-for = "g in allGroups" v-on:click = "addGroup(g)">
						<div class = image>
							<img v-bind:src="g.image">
						</div>
						<div class = "center aligned content">
							{{g.name}}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script >
	import groupService from './../services/groupService'
	import personService from './../services/personServices'
	import eventService from './../services/EventService'
	var input = '';
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
				allGroups: [],
				newGroup: {
					image: 'img/fondo.jpg', 
					name: '',
					state: ''
				},
				event: {
					name: '',
					description: '',
					dateAndTime: '', 
					image: 'img/fondo.jpg',
					status: ''
				}, 
				lookedForImage: false
			}
		}, 
		methods:{
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
				this.newGroup.image = input;
				$("#cGroups").attr("src", input);
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
				this.lookedForImage = true;
				$("#mGroups").attr("src", input);
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
				this.lookedForImage = true;
				$("#cEvents").attr("src", input);
				$("#mEvents").attr("src", input);
			},
			quitGroup(){
				this.showInfo = false;
				personService.deleteGroup({group: this.currentGroup.idGroup},this.user.IDPerson).then(response => {
					alert('Exito');
					}, response => {
						alert('Error');
					});
				groupService.removeMember({member: this.user.IDPerson},this.currentGroup.idGroup).then(response => {
						alert('Exitos');
						this.refreshCards();
					}, response => {
						alert('Error');
					});
			},
			refreshCards(){
				this.user = {};
				this.groups = [];
				this.showInfo = false;
				personService.getPersonById(localStorage.getItem('idUser')).then(response => {
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
			showGroupsModal(){
				this.allGroups = [];
				this.getAllGroups();
				$('#groupsModal').modal('show');
			},
			showCreateGModal(){
				$('#create').modal('show');
			},
			showModifyModal(element){
				this.currentGroup = element;
				$('#modify').modal('show');
			},
			showCreateEventModal(){
				$('#createEvent2').modal('show');
			},

			showDeleteEventModal(element){
				this.event = element;
				$('#quitEvent2').modal('show');
			},
			showModifyEventModal(element){
				this.event = element;
				$('#modifyEvent2').modal('show');
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
			},
			modifyGroup(){
				if(this.lookedForImage){
					this.currentGroup.image = input;
					this.lookedForImage = false;
				}

				groupService.updateGroup(this.currentGroup, this.currentGroup.idGroup).then(response=>{
					alert('Exito');
					this.refreshCards();
				}, response => {
					alert('Error');
				});
			},
			createEvent2(){
				eventService.createEvent(this.event).then(response => {
						eventService.getEvents().then(response => {
							groupService.addEvent({event: response.body[response.body.length-1].IDEvent},this.currentGroup.idGroup).then(response => {
								alert('Agregado');
								this.refreshCards();
							},response => {
								alert('Error');
							});
						}, response => {
							alert('Error');
						});
						
					alert('Exito');
				}, response => {
					alert('Error');
				});

			},
			deleteEvent2(){
				eventService.deleteEvent(this.event.IDEvent).then(response => {
					alert('Eliminado');
				}, response => {
					alert('Error');
				});
				groupService.removeEvent({event: this.event.IDEvent}, this.currentGroup.idGroup).then(response => {
					alert('Exito');
					this.refreshCards();
				},response => {
					alert('Error');
				})
			},
			modifyEvent2(){
				if(this.lookedForImage){
					this.lookedForImage = false;
					this.event.image = input;
				}
				eventService.editEvent(this.event,this.event.IDEvent).then(response => {
					alert('Exito');
					this.refreshCards();
				}, response => {
					alert('Error');
				});
			},
			getAllGroups(){
				groupService.getAllGroups().then(response => {
					for(let i = 0; i < response.body.length; i++){
						if(!this.verifyGroups(response.body[i])){
							this.allGroups.push(response.body[i]);
						}
					}
				}, response => {
					alert('Error');
				});
			}, 
			verifyGroups(element){
				for(let i = 0; i < this.user.listOfGroups.length; i++){
					if(element.idGroup === this.user.listOfGroups[i] || 
						element.state === 'private'){
						return true;
					}
				}
				return false;
			}, 
			addGroup(element){
				groupService.addMember({member: this.user.IDPerson}, element.idGroup).then(response => {
					alert('Exito');
				}, response => {
					alert('Error');
				});

				personService.addGroup({group: element.idGroup}, this.user.IDPerson).then(response => {
					alert('Exito');
					this.refreshCards();
				}, response => {
					alert('Error');
				});
				$('#groupsModal').modal('hide');
			}
		},
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('idUser')).then(response => {
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
		}
	}
</script>

<style scoped>

.spacedSegment {
	margin-bottom: 6%;
}
	
</style>