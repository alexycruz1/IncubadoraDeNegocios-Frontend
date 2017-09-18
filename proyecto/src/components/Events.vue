<template>
	<div id = "Events">

		<div class = "ui center aligned grid">
			<div class = "six wide column">
				<div class = "ui big message">
					Mis eventos
					<div class = "ui right floated icon buttons">
						<button class = "ui blue button" v-on:click = "showCreateEventModal()">
							<i class = "plus icon"></i>	
						</button>	
					</div>
				</div>

			</div>
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
							<input type="text" placeholder= "nombre" v-model = "name">
						</div>
						<div class = "field">
							<label>Estado: </label>
							<input type="text" placeholder= "estado" v-model  = "status">
						</div>
						<div class = "field">
							<label>descripcion: </label>
							<input type="text" placeholder= "Descripcion" v-model  = "description">
						</div>
						<div class = "field">
							<label>Fecha: </label>
							<input type="text" placeholder= "Fecha" v-model  = "dateAndTime">
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

		<div class = "ui six cards">
			<div class = "ui fluid card" v-for = "event in allEvents">
				<div class = "image">
					<img id = "eventImage2" src = "img/imageNo.jpg">
				</div>
				<div class = "content">
					<div class = "header">{{event.name}}</div>
					<div class = "meta">
						<a>{{event.status}}</a>
					</div>
				</div>
				<div class="extra content">
      				<div class="ui two buttons">
        				<div class="ui basic green button">Modificar</div>
        				<div class="ui basic red button">Salir</div>
      				</div>	  
    			</div>
			</div>
		</div>
			
	</div>
</template>

<script>
	import personService from './../services/personServices'
	import eventService from './../services/EventService'
	var input = 'nada';


	if(sessionStorage.getItem('userInfo') != undefined){
		var actualUser = sessionStorage.getItem('userInfo');
		actualUser = JSON.parse(actualUser);
		actualUser = actualUser[0].ID;
	}
	
	export default{
		name: 'events', 
		data(){
			return {
				allEvents: [],
				user:{}
			}
		}, 
		methods:{
			uploadImg(){

				input = document.createElement("INPUT");
				input.setAttribute("type", "file");
				input.click();

				input.onchange = function () {
					input = this.value;
					input = input.substring(12, input.length);
					input = "img/" + input;

					$("#eventImage").attr("src", input);	
				};
			},
			showCreateEventModal(){
				$("#eventImage").attr("src", "img/imageNo.jpg");

				$('#createEvent').modal('show');
			},
			createEvent(){
				$("#eventImage2").attr("src", input);

				personService.getPersonById(actualUser).then(response => {
					this.user = response.body[0];
					alert('user assigned');
				}, response =>{
					alert('Error');
				});

				var newEvent = {IDEvent: Number, name: this.name, description: this.description, dateAndTime: Date, 
					listOfPeople: [Number], status: this.status, image: input};

					eventService.createEvent(newEvent).then(response => {
						alert('Event created');
					}, response => {
						alert('Error');
					})

						var currentEvent;

					eventService.getEvents().then(response =>{
          				for(let i = 0; i < response.body.length; i++){
            				if(i === response.body.length - 1){
								currentEvent = response.body[i];

								personService.addEvent({event: currentEvent.IDEvent}, actualUser).then(response => {
									alert('event added to person');
								}, response => {
									alert('Error');
								});

								eventService.addPersonToEvent({person: actualUser}, currentEvent.IDEvent).then(respone =>{
									alert('person added to event');
								}, response => {
									alert('Error');
								});

								break;
							}
          				}
        			}, response =>{
          				alert('Error');
        			});

					personService.getPersonById(actualUser).then(response => {
						alert('usuario encontrado');
						this.user = response.body[0];
						for(let i = 0; i < this.user.listOfEvents.length; i++){
							eventService.getEventByID(this.user.listOfEvents[i]).then(response => {
								if(response.body[i] != undefined){
									this.allEvents.push(response.body[0]);
									alert('Evento añadido a lista');
								}else{
									alert('Evento no existe')
								}
							}, response => {
								alert('Error');
							});
						}
					}, response => {
						alert('Error');
					});

					console.log(this.user.listOfEvents);
			}
		}
	}
</script>

<style scoped>
	
</style>