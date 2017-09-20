<template>
	<div class = "Assesors">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">
					Mis empresas
				</div>
				<div class = "ui two cards" style="overflow-y:scroll;max-height: 400px;">
					<div class = "ui fluid card" v-for = "element of myBusiness" v-on:click = "getAssesors(element)">
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
    					<div class = "extra content">
    						
    					</div>
					</div>
				</div>
			</div>
			<div class = "one wide column">
				<div class = "vertical divider"></div>
			</div>
			<div class = "seven wide column">
				<div class = "ui big message">
					Asesores Disponibles
				</div>
				<div class = "ui two cards" style="overflow-y:scroll;height: 400px;">
					<div class = "ui card" v-for= "assesor in assesors">
						<div class = "ui black ribbon label">
							{{assesor.name}}
						</div>
						<div class = "image">
							<img v-bind:src="assesor.image">
						</div>
						<div class = "content">
							<a>{{assesor.email}}</a>
							<a>{{assesor.phone}}</a>
						</div>
						<div class = "extra content">
							<div class = "ui basic black button" v-on:click = "createRequest(assesor)">
								Enviar solicitud
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class = "one wide column"></div>
		</div>
		<br>

		<div class = "ui mini modal" id = "ask">
			<i class = "close icon"></i>
			<div class = "header">Desea Enviar?</div>
			<div class = "extra content">
				<div class="actions">
    				<div class="ui black deny button">
      					Cancelar
    				</div>
    				<div class="ui green right labeled icon button" v-on:click = "sendRequest()">
      					Enviar
      					<i class="checkmark icon"></i>
    				</div>
 		 		</div>
			</div>
		</div>			
	</div>
</template>

<script>
	import personService from './../services/personServices'
	import businessService from './../services/businessService'

	export default{
		name: 'Assesor', 
		data(){
			return {
				user: {},
				myBusiness: [],
				assesors: [],
				currentBusiness: {},
				currentAssesor: {}
			}
		}, 
		methods: {
			getAssesors(element){
				this.currentBusiness = element;
				this.assesors = [];
				personService.getPeople().then(response => {
				for(let i = 0; i < response.body.length; i++){
					if(response.body[i].isAdviser){
						this.assesors.push(response.body[i]);
					}
				}
			}, response => {
				alert('Error');
			});
			},
			createRequest(element){
				this.currentAssesor = element;
				$('#ask').modal('show');
			},
			sendRequest(){
				var existRequest = false;
				for(let i = 0; i < this.currentAssesor.listOfBusiness; i++){
					if(this.currentAssesor.listOfBusiness[i] === this.currentBusiness.idBusiness){
						existRequest = true;
						console.log('Ya asesora a la empresa');
					}
				}

				for(let i = 0; i < this.currentAssesor.listOfRequests; i++){
					if(this.currentAssesor.listOfRequests[i] === this.currentBusiness.idBusiness){
						existRequest = true;
						alert('Ya envio la solicitud');
					}
				}
				if(!existRequest){
					personService.addRequest({request: this.currentBusiness.	idBusiness}, this.currentAssesor.IDPerson).then(response 	=> {
						alert('Exito');
					}, response => {
						alert('Error');
					});
				}
			}
		}, 
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('idUser')).then(response => {
				this.user = response.body[0];
				console.log('User: ', this.user);
				for(let i = 0; i < this.user.listOfBusiness.length; i++){
					businessService.getBusinessById(this.user.listOfBusiness[i]).then(response => {
						this.myBusiness.push(response.body[0]);
						
					}, response => {
						alert('Error');
					});
				}
			}, response => {
				alert('Error');
			});

			
		}
	}
</script>

<style scoped>
	
</style>