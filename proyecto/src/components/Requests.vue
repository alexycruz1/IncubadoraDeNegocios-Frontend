<template>
	<div class = "Requests">
		<div class = "ui grid">
			<div class = "four wide column">
				<div class = "ui vertical divider"></div>
			</div>
			<div class = "eight wide column">
				<div class = "ui big message">
					Solicitudes
				</div>

				<div class = "ui items">
					<div class ="item" v-for = "request in requests">
						<div class = "image">
							<img v-bind:src="request.image">
						</div>
						<div class = "content">
							<div class = "header">
								{{request.name}}
							</div>
							<div class = "meta">
								{{request.location}}
							</div>
							<div class = "description">
								{{request.description}}
							</div>
							<br>
							<br>
							<div class = "ui two buttons">
								<div class="ui red deny button" v-on:click = "openDeny(request)">
      								Rechazar
    							</div>
    							<div class="ui green right labeled icon button" v-on:click = "openAccept(request)">
      								Aceptar
      								<i class="checkmark icon"></i>
    							</div>
							</div>
						</div>	
					</div>
				</div>
				<br>
			</div>
			<div class = "four wide column">
				<div class = "ui vertical divider"></div>
			</div>	
		</div>
		<div class = "ui mini modal" id = "deny">
			<i class = "close icon"></i>
			<div class = "header">Desea Rechazar?</div>
			<div class = "extra content">
				<div class="actions">
    				<div class="ui black deny button">
      					Cancelar
    				</div>
    				<div class="ui red right labeled icon button" v-on:click = "denyRequest()">
      					Rechazar
      					<i class="checkmark icon"></i>
    				</div>
 		 		</div>
			</div>
		</div>	
		<div class = "ui mini modal" id = "accept">
			<i class = "close icon"></i>
			<div class = "header">Desea Aceptar?</div>
			<div class = "extra content">
				<div class="actions">
    				<div class="ui black deny button">
      					Cancelar
    				</div>
    				<div class="ui green right labeled icon button" v-on:click = "acceptRequest()">
      					Aceptar
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
		name: 'Requests', 
		data(){
			return {
				user: {},
				requests: [],
				currentBusiness: {}
			}
		},
		methods: {
			openDeny(element){
				this.currentBusiness = element;
				$('#deny').modal('show');
			}, 
			openAccept(element){
				this.currentBusiness = element;
				$('#accept').modal('show');
			},
			acceptRequest(){
				personService.deleteRequest({request: this.currentBusiness.idBusiness}, this.user.IDPerson).then(response => {
					alert('Exito');
					this.refreshItems();
				}, response => {
					alert('Error');
				});

				businessService.addOwner({owner: this.user.IDPerson},this.currentBusiness.idBusiness).then(response =>{
							alert('Exito');
						}, response => {
							alert('Error');
						});

						personService.addBusiness({business: this.currentBusiness.idBusiness},this.user.IDPerson).then(response =>{
							alert('Exito');
						}, response => {
							alert('Error');
						});
			},
			denyRequest(){
				personService.deleteRequest({request: this.currentBusiness.idBusiness}, this.user.IDPerson).then(response => {
					alert('Exito');
					this.refreshItems();
				}, response => {
					alert('Error');
				});
			},
			refreshItems(){
				personService.getPersonById(localStorage.getItem('idUser')).then(response => {
				this.user = response.body[0];

				for(let i = 0; i < this.user.listOfRequests.length; i++){
					businessService.getBusinessById(this.user.listOfRequests[i]).then(response => {
						this.requests.push(response.body[0]);
						console.log(response.body[0]);
					}, response => {
						alert('Error');
					});
				}
			}, response => {
				alert('Error');
			});
			}
		}, 
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('idUser')).then(response => {
				this.user = response.body[0];

				for(let i = 0; i < this.user.listOfRequests.length; i++){
					businessService.getBusinessById(this.user.listOfRequests[i]).then(response => {
						this.requests.push(response.body[0]);
						console.log(response.body[0]);
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