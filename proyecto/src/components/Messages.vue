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
						<textarea rows = "2" v-model = "newMessage.body"></textarea>
					</div>
					<br>
					<div class = "ui right floated blue button" v-on:click = "sendMessage()">Enviar</div>	
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
				newMessage: {
					idEmisor: '',
					body: ''
				},
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
				this.hear();
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
			},
			hear(){
				this.pubnub = new PubNub({
					subscribeKey: 'sub-c-871b7b46-9a9a-11e7-bec3-c65ebd354f7d',
            		publishKey: 'pub-c-0e9c4d6d-1364-4c4e-89e3-b1ef0efde503'
				});

				this.pubnub.addListener({
					status: function(eventStatus){
						if(eventStatus.category === 'PNConnectedCategory'){
							console.log('Conectado');
						}else{
							console.log('Error');
						}
					},
					message: this.recieveMessage
					
				});

				this.pubnub.subscribe({
					channels: ['myChannel']
				});
			},
			sendMessage(){
				this.newMessage.idEmisor = this.user.IDPerson;

				messageService.createMessage(this.newMessage).then(response => {
					messageService.getAllMessages().then(response => {
						this.allMessages = response.body;
						console.log('Mensajes',this.allMessages);
						chatService.addMessageToChat({message: this.allMessages[this.allMessages.length -1].idMessage},this.currentChat.IDChat).then(response => {
							this.pubnub.publish({
								channel: 'myChannel',
								message: this.newMessage.body 
							},function(status,response){
								console.log(status,response);
							});
							this.getAllChats();
							alert('Exito agregando al chat');	
						}, response => {
							alert('Error agregando al chat');
						})
					}, response => {
						alert('Error');
					});
				}, response => {
					alert('Error creating message');
				});
			},
			getAllChats(){
				chatService.getChats().then(response => {
					this.allChats = response.body;
					this.selectPerson(this.currentUser);
				}, response => {
					alert('Error');
				});
			},
			getAllMessages(){
				messageService.getAllMessages().then(response => {
					this.allMessages = response.body;
					console.log('Mensajes: ',this.allMessages);
				}, response => {
					alert('Error');
				});
			},
			recieveMessage(message){
				this.newMessage.idEmisor = this.currentUser.IDPerson;
				this.newMessage.body = message.message;
				messageService.createMessage(this.newMessage).then(response => {
					messageService.getAllMessages().then(response => {
						this.allMessages = response.body;
						chatService.addMessageToChat({message: this.allMessages[this.allMessages.length -1].idMessage},this.currentChat.IDChat).then(response => {
							this.getAllChats();
							alert('Exito agregando al chat');	
						}, response => {
							alert('Error agregando al chat');
						})
					}, response => {
						alert('Error');
					});
				}, response => {
					alert('Error creating message');
				});
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
			}, response => {
				alert('Error');
			});

			messageService.getAllMessages().then(response => {
				this.allMessages = response.body;
				console.log('Mensajes: ',this.allMessages);
			}, response => {
				alert('Error');
			});
		}
	}
</script>

<style scoped>
	
</style>