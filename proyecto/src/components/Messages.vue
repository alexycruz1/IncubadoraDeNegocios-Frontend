<template>
	<div id = "Messages">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column">
				<div class = "ui big message">
					Contactos
				</div>
				<div class = "ui two cards">
					<div class = "ui fluid card" v-for = "u in otherUsers" v-on:click = "selectPerson(u)">
						<div class = "image">
							<img v-bind:src="u.image">
						</div>
						<div class = "content">
							{{u.name}}
						</div>
						<div class = "extra content">
							
						</div>
					</div>
				</div>
				<div class = "ui big message">
					Grupos
				</div>
				<div class = "ui two cards">
					<div class = "ui fluid card" v-for = "group in myGroups">
						<div class = "image">
							<img v-bind:src="group.image">
						</div>
						<div class = "content">
							{{group.name}}
						</div>
						<div class = "extra content">
							
						</div>
					</div>
				</div>
			</div>
			<div class = "one wide column">
				<div class = "ui vertical divider"></div>
			</div>
			<div class = "seven wide column">
				<div class = "ui fluid floated segment">
					<div class = "ui big message">
						Chat
					</div>
					<div class = "scrolling content">
						<div v-for = "item in array">
							<div v-bind:class = "item.segment">
								<div class = "ui top attached label">
									{{item.user}}
								</div>
								<div class = "ui label">
									<img class = "ui right spaced avatar image" v-bind:src="item.image">
									{{item.message}}
								</div>
							</div>
							<br>
						</div>
					</div>
					<div class = "ui form">
						<label>New Message</label>
						<textarea rows = "2"></textarea>
					</div>
					<br>
					<div class = "ui right floated blue button">Enviar</div>	
				</div>
				
			</div>
			<div class = "one wide column"></div>
		</div>
		<br>
	</div>
</template>

<script >
	import PubNub from 'pubnub'
	import personService from './../services/personServices'
	import groupService from './../services/groupService'
	import chatService from './../services/chatService'
	import messageService from './../services/messageService'

	export default {
		name: 'Messages',
		data(){
			return {
				pubnub: {},
				user: {},
				currentChat: {},
				currentUser:{},
				otherUsers: [],
				myGroups: [],
				allChats: [],
				allMessages: [],
				currentMessages: [],
				array: []
			}
		}, 
		methods: {
			selectPerson(element){
				var existChat = false;
				this.currentUser = element;
				this.currentMessages = [];
				for(let i = 0; i < this.allChats.length; i++){
					if(this.verifyChat(this.user.IDPerson,this.allChats[i]) && this.verifyChat(element.IDPerson,this.allChats[i])){
						existChat = true;
						this.currentChat = this.allChats[i];
					}
				}
				if(existChat){
					for(let i = 0; i < this.currentChat.listOfMessages.length; i++){
						for(let k = 0; k < this.allMessages.length; k++){
							if(this.allMessages[k].idMessage === this.currentChat.listOfMessages[i]){
								this.currentMessages.push(this.allMessages[k]);
							}
						}
					}
					this.prepareArray();
				}else{
					chatService.createChat({
						listOfPeople: this.user.IDPerson,
						listOfPeople: this.currentUser.IDPerson
					}).then(response => {
						chatService.getChats().then(response => {
							this.allChats = response.body;
							console.log('Chats; ',this.allChats);
							this.selectPerson(this.currentUser);
						}, response => {
							alert('Error');
						});
					}, response => {
						alert('Error');
					});
				}
			},
			verifyChat(idPerson,chat){
				if(chat.listOfPeople.length == 2){
					for(let i = 0; i < chat.listOfPeople.length; i++){
						if(idPerson === chat.listOfPeople[i]){
							return true;
						}
					}
				}
				return false;
			},
			prepareArray(){
				this.array = [];
				for(let i = 0; i < this.currentMessages.length; i++){
					if(this.currentMessages[i].idEmisor === this.user.IDPerson){
						this.array.push({
							segment: 'ui right aligned clearing segment',
							image: this.user.image,
							message: this.currentMessages[i].body,
							user: this.user.name
						});
					}else{
						this.array.push({
							segment: 'ui left aligned clearing segment',
							image: this.currentUser.image,
							message: this.currentMessages[i].body,
							user: this.currentUser.name
						});	
					}
				}
				console.log(this.array);
			}
		}, 
		beforeCreate(){
			personService.getPersonById(2).then(response => {
				this.user = response.body[0];
				personService.getPeople().then(response => {
					for(let i = 0; i < response.body.length; i++){
						if(!(response.body[i].IDPerson === this.user.IDPerson)){
							this.otherUsers.push(response.body[i]);
						}				
					}
					console.log('Users', this.otherUsers);
				}, response => {
					alert('Error');
				});

				for(let i = 0; i < this.user.listOfGroups.length; i++){
					groupService.getGroupById(this.user.listOfGroups[i]).then(response => {
						this.myGroups.push(response.body[0]);
					}, response => {
						alert('Error');
					});
				}
			}, response => {
				alert('Error');
			});
			chatService.getChats().then(response => {
				this.allChats = response.body;
				console.log('Chats; ',this.allChats);
			}, response => {
				alert('Error');
			});

			messageService.getAllMessages().then(response => {
				this.allMessages = response.body;
				console.log(this.allMessages);
			}, response => {
				alert('Error');
			});
		}
	}
</script>

<style scoped>
	
</style>