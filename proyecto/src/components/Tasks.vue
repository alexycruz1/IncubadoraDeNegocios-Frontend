<template>
	<div id = "tasks">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">Mis Empresas</div>
				<div class = "ui two cards">
					<div class = "ui fluid card" v-for = "business in myBusiness" v-on:click = "show(business)">
						<div class = "image">
							<img v-bind:src="business.image">
						</div>
						<div class = "content">
							{{business.name}}
						</div>
						<div class = "extra content"></div>
					</div>
				</div>
			</div>
			<div class = "one wide column">
				<div class = "ui vertical divider">	
				</div>	
			</div>
			<div class = "seven wide column">	
				<div class = "ui big message">	
					Tareas
				</div>
				<div id = "calendar">	
				</div>
			</div>
			<div class = "one wide column"></div>	
		</div>
		<br>
	</div>
</template>

<script >
	import personService from'./../services/personServices'
	import businessService from './../services/businessService'
	import taskService from './../services/taskService'
	
	export default{
		name: 'tasks',
		data(){
			return {
				user: {},
				myBusiness: [],
				currentTasks: [],
				currentBusiness: {}
			}
		},
		methods: {
			show(element){
				this.currentBusiness = element;
				$('#calendar').fullCalendar({
				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'month,basicWeek,basicDay'
				},
			});

			}
		},
		beforeCreate(){
			personService.getPersonById(3).then(response => {
				this.user = response.body[0];
				for(let i = 0; i < this.user.listOfBusiness.length; i++){
					businessService.getBusinessById(this.user.listOfBusiness[i]).then(response => {
						this.myBusiness.push(response.body[0]);
					}, response => {
						alert('Error');
					});
				}
			}, response => {
				alert('Error')
			});
		},
	}
</script>

<style scoped>
	
</style>