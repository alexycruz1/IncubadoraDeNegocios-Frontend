<template>
	<div id = "tasks">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">Mis Empresas</div>
				<div class = "ui two cards" style="overflow-y:scroll;max-height: 400px;">
					<div class = "ui fluid card" v-for = "business in myBusiness" v-on:click = "show(business)">
						<div class = "ui black ribbon label">
							{{business.name}}
						</div>
						<div class = "image">
							<img v-bind:src="business.image">
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
		<div class = "ui mini modal" id = "newTaskModal">
			<i class = "close icon"></i>
			<div class = "header">Creacion de Tareas</div>
			<br>
			<div class= "ui form">
				<div class = "field">
					<label>Actividad</label>
					<input type="text" placeholder = "Actividad" v-model =  "task.activity">
				</div>
				<div class = "field">
					<label>Estado</label>
					<input type="text" placeholder = "Estado" v-model = "task.state">
				</div>
			</div>
			<br>
			<div class = "actions">
				<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "createTask()">
      				Crear
      				<i class="checkmark icon"></i>
    			</div>
			</div>	
		</div>
		<div class = "ui mini modal" id = "options">
			<i class = "close icon"></i>
			<div class = "header">Opciones</div>
			<div class = "actions">
				<div class="ui black deny button" v-on:click = "deleteTask()">
      				Eliminar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "showModifyTaskModal()">
      				Modificar
      				<i class="checkmark icon"></i>
    			</div>
			</div>
		</div>
		<div class = "ui mini modal" id = "modifyTaskModal">
			<i class = "close icon"></i>
			<div class = "header">Modificacion de Tareas</div>
			<br>
			<div class= "ui form">
				<div class = "field">
					<label>Actividad</label>
					<input type="text" v-bind:value = "task.activity" v-model =  "task.activity">
				</div>
				<div class = "field">
					<label>Estado</label>
					<input type="text" v-bind:value = "task.state" v-model = "task.state">
				</div>
			</div>
			<br>
			<div class = "actions">
				<div class="ui black deny button">
      				Cancelar
    			</div>
    			<div class="ui positive right labeled icon button" v-on:click = "modifyTask()">
      				Modificar
      				<i class="checkmark icon"></i>
    			</div>
			</div>	
		</div>
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
				realTasks: [],
				task: {
					activity : '',
					date: '',
					state: '',
					idAdviser: 0,
					idBusiness: 0
				},
				showButton:false,
				currentBusiness:{},
				alreadyMounted:false
			}
		},
		methods: {
			show(element){
				this.showButton = true;
				this.currentTasks = [];
				this.realTasks = [];
				this.currentBusiness = element;

				if(!this.alreadyMounted){
					this.alreadyMounted = true;
					taskService.getTasksByBusiness(element.idBusiness).then(response => {
						this.realTasks = response.body;
							for(let i = 0; i < response.body.length; i++){
									this.currentTasks.push({
										title: response.body[i].activity,
										start: response.body[i].date
									});
							}

							console.log(response.body);
							$('#calendar').fullCalendar({
								header: {
									left: 'prev,next today',
									center: 'title',
									right: 'month,basicWeek,basicDay'
								},
								navlinks: true,
								editable: true,
								events: this.currentTasks,
								eventClick: this.showOptions,
								dayClick: this.showNewTaskModal,
								eventDrop: this.changeDate
							});
					}, response =>{
						alert('Error');
					});
				}else{
					this.alreadyMounted = false;
					this.setTasks();
				}
			},
			showNewTaskModal(date){
				this.task.activity = '';
				this.task.state = '';
				console.log(date.format('YYYY/MM/DD'));
				this.task.date = date.format('YYYY/MM/DD');
				$('#newTaskModal').modal('show');
			},
			showModifyTaskModal(){
				$('#modifyTaskModal').modal('show');
			},
			showOptions(event){
				for(let i = 0; i < this.realTasks.length; i++){
					if(event.title === this.realTasks[i].activity && (event.start.format('YYYY-MM-DD') + 'T06:00:00.000Z') === this.realTasks[i].date){
						console.log('Entra: ', this.realTasks[i]);
						this.task = this.realTasks[i];
					}
				}
				$('#options').modal('show');
			},
			createTask(){
				this.task.idAdviser = this.user.IDPerson;
				this.task.idBusiness = this.currentBusiness.idBusiness;
				taskService.createTask(this.task).then(response => {
					this.setTasks();
				},response => {
					alert('Error');
				});
			},
			setTasks(){
				$('#calendar').fullCalendar('destroy');
				this.show(this.currentBusiness);
			},
			deleteTask(){
				taskService.deleteTask(this.task.idTask).then(response => {
					this.setTasks();
				}, response => {
					alert('Error');
				})
			},
			modifyTask(){
				taskService.updateTask(this.task,this.task.idTask).then(response => {
					this.setTasks();
				}, response => {
					alert('Error');
				})
			},
			changeDate(event,delta,revertFunc){
				this.task = this.verifyGroups(event);
				this.task.date = event.start.format('YYYY/MM/DD');
				taskService.updateTask(this.task,this.task.idTask).then(response => {
					this.setTasks();
				}, response => {
					alert('Error');
				});	
			},
			verifyGroups(event){
				for(let i = 0; i < this.realTasks.length; i++){
					if(event.title === this.realTasks[i].activity){
						console.log(this.realTasks[i]);
						return this.realTasks[i];
					}
				}
			}
		},
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('idUser')).then(response => {
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