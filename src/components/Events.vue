<template>
	<div id = "Events">
	<br><br>
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "fourteen wide column">
				<div class = "ui big message">
					Mis eventos
					<div class = "ui right floated icon buttons">
						<button class = "ui blue button" v-on:click = "showCreateEventModal()">
							<i class = "plus icon"></i>	
						</button>	
					</div>
				</div>

				<div class = "ui four cards">
					<div class = "ui fluid card" v-for = "event in allEvents">
						<div class = "image">
							<img id = "eventImage2" v-bind:src = "event.image">
						</div>
						<div class = "content">
							<div class = "header">{{event.name}}</div>
								<div class = "meta">
									<a>{{event.status}}</a>
								</div>
							</div>
							<div class="extra content">
      							<div class="ui two buttons">
        							<div class="ui basic green button" v-on:click = "modifyEventModal(event)">Modificar</div>
        							<div class="ui basic red button" v-on:click = "deleteEventModal(event)">Eliminar</div>
      							</div>	  
    						</div>
					</div>
				</div>
			</div>
			<div class = "one wide column"></div>
		</div>

		<div class = "ui modal" id = "createEvent">
			<i class = "close icon"></i>
			<div class = "header">
				Creacion de Eventos
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image" v-on:click = "uploadImg()">
						<img id="eventImage" src = "img/imageNo.jpg">
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
    			<div class="ui positive right labeled icon button" v-on:click = "createEvent()">
      				Crear
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>

		


		<div class = "ui modal" id = "modifyEvent">
			<i class = "close icon"></i>
			<div class = "header">
				Modificacion de Eventos
			</div>
			<div class = "ui center aligned grid">
				<div class = "seven wide column">
					<div class = "ui medium image">
						<img v-bind:src="event.image">
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
    			<div class="ui positive right labeled icon button" v-on:click = "modifyEvent()">
      				Modificar
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>

		<div class = "ui mini modal" id = "quitEvent">
			<i class = "close icon"></i>
			<div class = "header">¿Desea Eliminar?</div>
			<div class = "extra content">
				<div class="actions">
    				<div class="ui black deny button">
      					Cancelar
    				</div>
    				<div class="ui red right labeled icon button" v-on:click = "deleteEvent()">
      					Eliminar
      					<i class="checkmark icon"></i>
    				</div>
 		 		</div>
			</div>
		</div>
		<br><br><br>	
	</div>
</template>

<script>
	import personService from './../services/personServices'
	import eventService from './../services/EventService'
	var input = 'nada';


	export default{
		name: 'events', 
		data(){
			return {
				allEvents: [],
				user:{},
				event: {
					name: '',
					description: '',
					dateAndTime: '', 
					image: '',
					status: ''
				},
				actualUser: Number
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
				input = "img/" + input;
				this.event.image = input;
				$("#eventImage").attr("src", input);
			},
			showCreateEventModal(){
				$("#eventImage").attr("src", "img/imageNo.jpg");

				$('#createEvent').modal('show');
			},
			deleteEventModal(element){
				this.event = element;
				$('#quitEvent').modal('show');
			},
			modifyEventModal(element){
				this.event = element;
				$('#modifyEvent').modal('show');
			},
			createEvent(){
				$("#eventImage2").attr("src", input);

				for (var i = this.allEvents.length; i > 0; i--) {
 					this.allEvents.pop();
				}

				this.actualUser = localStorage.getItem('idUser');

				personService.getPersonById(this.actualUser).then(response => {
					this.user = response.body[0];
				}, response =>{
					alert('Error');
				});

					eventService.createEvent(this.event).then(response => {
						this.actualUser = localStorage.getItem('idUser');


					eventService.getEvents().then(response =>{
          				for(let i = 0; i < response.body.length; i++){
            				if(i === response.body.length - 1){
								this.currentEvent = response.body[i];
								this.allEvents.push(this.currentEvent);

								personService.addEvent({event: this.currentEvent.IDEvent}, this.actualUser).then(response => {
								}, response => {
									alert('Error');
								});

								eventService.addPersonToEvent({person: this.actualUser}, this.currentEvent.IDEvent).then(respone =>{
								}, response => {
									alert('Error');
								});

								break;
							}
          				}
        			}, response =>{
          				alert('Error');
        			});

					this.actualUser = localStorage.getItem('idUser');

					personService.getPersonById(this.actualUser).then(response => {
						this.user = response.body[0];

						for(let i = 0; i < this.user.listOfEvents.length; i++){
							eventService.getEventByID(this.user.listOfEvents[i]).then(response => {
								this.allEvents.push(response.body[0]);

							}, response => {
								alert('Error');
							});
						}

					}, response => {
						alert('Error');
					});


					}, response => {
						alert('Error');
					});
			},
			deleteEvent(){
				eventService.deleteEvent(this.event.IDEvent).then(response => {

					for (var i = this.allEvents.length; i > 0; i--) {
 						this.allEvents.pop();
					}

					this.actualUser = localStorage.getItem('idUser');
					personService.deleteEvent({event:this.event.IDEvent}, this.actualUser).then(response => {
						personService.getPersonById(this.actualUser).then(response => {
						this.user = response.body[0];

						for(let i = 0; i < this.user.listOfEvents.length; i++){
							eventService.getEventByID(this.user.listOfEvents[i]).then(response => {
								this.allEvents.push(response.body[0]);

							}, response => {
								alert('Error');
							});
						}
					}, response => {
						alert('Error');
					});
					}, response => {
						alert('Error');
					})
					
					alert('Eliminado');
				}, response => {
					alert('Error');
				});
			},
			modifyEvent(){
				eventService.editEvent(this.event, this.event.IDEvent).then(response => {
					for (var i = this.allEvents.length; i > 0; i--) {
 						this.allEvents.pop();
					}

					this.actualUser = localStorage.getItem('idUser');

					personService.getPersonById(this.user.IDPerson).then(response => {
						this.user = response.body[0];

						for(let i = 0; i < this.user.listOfEvents.length; i++){
							eventService.getEventByID(this.user.listOfEvents[i]).then(response => {
								this.allEvents.push(response.body[0]);

							}, response => {
								alert('Error');
							});
						}

					}, response => {
						alert('Error');
					});


				}, response => {
					alert('Error');
				});
			}
		},
		beforeCreate(){

			if(localStorage.getItem('idUser') != undefined){
				this.actualUser = localStorage.getItem('idUser');

				personService.getPersonById(this.actualUser).then(response => {
					this.user = response.body[0];
					console.log(this.user);
					for(let i = 0; i < this.user.listOfEvents.length; i++){
						eventService.getEventByID(this.user.listOfEvents[i]).then(response =>{
							this.allEvents.push(response.body[0]);
							console.log()
						}, response => {
							alert('Error');
						} )
					}
				},response => {
					alert('Error');
				});

				eventService.getEvents()
			}
		}
	}
</script>

<style scoped>
	
</style>