<template>
	<div id = "Messages">
		<div class = "ui center aligned grid">
			<div class = "one wide column"></div>
			<div class = "six wide column" id = "cd">
				<div class = "ui big message" style = "">
					Contactos
				</div>
				<div class = "ui two cards" style="overflow-y:scroll;height: 200px;">
					<div class = "ui fluid card" v-for = "u in otherUsers" v-on:click = "selectPerson(u)">
						<div class = "ui black ribbon label">
							{{u.name}}
						</div>
						<div class = "image">
							<img v-bind:src="u.image">
						</div>
						<div class = "extra content">
						</div>
					</div>
				</div>
				<div class = "ui big message">
					Grupos
				</div>
				<div class = "ui two cards" style="overflow-y:scroll;height: 200px;">
					<div class = "ui fluid card" v-for = "group in myGroups" v-on:click = "selectGroup(group)">
						<div class = "ui black ribbon label">
							{{group.name}}
						</div>
						<div class = "image">
							<img v-bind:src="group.image">
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
				<div class = "ui fluid floated segment" >
					<div class = "ui big message">
						Chat
					</div>
					<div  id = "containerChat">
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
				currentGroup:{},
				personalChat: true,
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
			belongToGroup(chat){
				for(let i = 0; i < this.myGroups.length; i++){
					if(chat.IDChat === this.myGroups[i].idChat){
						console.log('Se metio con: ',chat.IDChat);
						return true;
					}
				}
				return false;
			},
			selectPerson(element){
				var existChat = false;
				this.personalChat = true;
				this.currentUser = element;
				this.currentMessages = [];
				for(let i = 0; i < this.allChats.length; i++){
					if(this.verifyChat(this.user.IDPerson,this.allChats[i]) && this.verifyChat(element.IDPerson,this.allChats[i])){
						if(this.belongToGroup(this.allChats[i]) ===false){
							//console.log('Entro con: ', this.allChats[i]);
							existChat = true;
							this.currentChat = this.allChats[i];
						}
					}
				}
				if(existChat){
					console.log('Chat si existe');
					//console.log('chat: ', this.currentChat);
					for(let i = 0; i < this.currentChat.listOfMessages.length; i++){
						for(let k = 0; k < this.allMessages.length; k++){
							if(this.allMessages[k].idMessage === this.currentChat.listOfMessages[i]){
								this.currentMessages.push(this.allMessages[k]);
							}
						}
					}
					//console.log('Mensajes: ', this.currentMessages);
					this.prepareArray();
					this.hear();
				}else{
					console.log('Chat no existe',this.user.IDPerson);
					console.log(this.allChats);
					chatService.createChat({
						listOfPeople: this.user.IDPerson
					}).then(response => {
						var id = 1;
						if(!(this.allChats.length === 0)){
							id = this.allChats[this.allChats.length-1].IDChat + 1;
						}
						chatService.addPersonToChat({listOfPeople: this.currentUser.IDPerson},id).then(response => {
							chatService.getChats().then(response => {
								this.allChats = response.body;
								this.currentChat = this.allChats[this.allChats.length-1];
								this.currentMessages = [];
								this.hear();
							}, response => {
								alert('Error');
							})
						}, response => {
							alert('Error');
						});
					}, response => {
						alert('Error');
					});
				}
				
			},
			selectGroup(element){
				this.personalChat = false;
				this.currentGroup = element;
				this.currentMessages = [];
				if(this.currentGroup.idChat === undefined){
					console.log('Entra');
					chatService.createChat({
						listOfPeople: this.currentGroup.members[0]
					}).then(response => {
						chatService.getChats().then(response => {
							this.currentChat = response.body[response.body.length-1];
								groupService.updateGroup({idChat: this.currentChat.IDChat},this.currentGroup.idGroup).then(response => {

								}, response => {
									alert('Error adding chat to group');
								});
							for(let i = 1; i < this.currentGroup.members.length; i++){
								chatService.addPersonToChat({
									listOfPeople: this.currentGroup.members[i]
								},this.currentChat.IDChat).then(response=>{
									chatService.getChats().then(response => {
										this.allChats = response.body;
										this.currentChat = response.body[response.body.length-1];
										this.hear();
									}, response => {
										alert('Error getting all chats');
									});
								}, response => {
									alert('Error adding members real');
								});
							}
						}, response => {
							alert('Error getting al chats grande');
						});
					}, response => {
						alert('Error creating chat');
					});
				}else{
					for(let i = 0; i < this.allChats.length; i++){
						if(this.allChats[i].IDChat === this.currentGroup.idChat){
							this.currentChat = this.allChats[i];
						}
					}
					for(let i = 0; i < this.currentChat.listOfMessages.length; i++){
						for(let k = 0; k < this.allMessages.length; k++){
							if(this.allMessages[k].idMessage === this.currentChat.listOfMessages[i]){
								this.currentMessages.push(this.allMessages[k]);
							}
						}
					}
					console.log(this.currentChat);
					console.log(this.currentMessages);
					this.hear();
				}
				this.prepareArray();
				
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
				console.log('Entra');
				for(let i = this.currentMessages.length-1; i >= 0; i--){
					if(this.currentMessages[i].idEmisor === this.user.IDPerson){
						this.array.push({
							segment: 'ui right aligned clearing segment',
							image: this.user.image,
							message: this.currentMessages[i].body,
							user: 'Y0'
						});
					}else{
						for(let k = 0; k < this.otherUsers.length; k++){
							if(this.currentMessages[i].idEmisor === this.otherUsers[k].IDPerson){
								this.currentUser = this.otherUsers[k];
							}
						}
						this.array.push({
							segment: 'ui left aligned clearing segment',
							image: this.currentUser.image,
							message: this.currentMessages[i].body,
							user: this.currentUser.name
						});	
					}
				}
				console.log(this.array);
				this.ScrollToBottom();
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
					channels: ['chat' + this.currentChat.IDChat]
				});
			},
			sendMessage(){
				this.newMessage.idEmisor = this.user.IDPerson;
				console.log('A enviar');
				messageService.createMessage(this.newMessage).then(response => {
					messageService.getAllMessages().then(response => {
						console.log('Se supone que refrezco');
						this.allMessages = response.body;
						console.log('Mensajes',this.allMessages);
						chatService.addMessageToChat({message: this.allMessages[this.allMessages.length -1].idMessage},this.currentChat.IDChat).then(response => {
							this.pubnub.publish({
								channel: 'chat2' + this.currentChat.IDChat,
								message: this.newMessage.body 
							},function(status,response){
								console.log(status,response);
							});
							//alert('Exito agregando al chat');	
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
					if(this.personalChat){
						console.log('EntreP')
						this.selectPerson(this.currentUser);
					}else{
						console.log('EntreG');
						this.selectGroup(this.currentGroup);	
					}
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
				this.currentMessages = [];
				chatService.getChatByID(this.currentChat.IDChat).then(response => {
					this.currentChat = response.body[0];
					console.log('Chat: ', this.currentChat);
					messageService.getAllMessages().then(response => {
						this.allMessages = response.body;

						for(let k = 0; k < this.currentChat.listOfMessages.length; k++){
							for(let i = 0; i < this.allMessages.length; i++){
								if(this.currentChat.listOfMessages[k] === this.allMessages[i].idMessage){
									this.currentMessages.push(this.allMessages[i]);
								}
							}
						}
						this.prepareArray();
					}, response => {
						alert('Error');
					});
				}, response => {
					alert('Error');
				});
				console.log('Recibi', message.message);
			},
			ScrollToBottom(){
     			var element = document.getElementById("containerChat");
     			console.log('Element: ', element);
    			element.scrollTop =20000;
    			console.log('Altura', 500);
			}
		}, 
		beforeCreate(){
			personService.getPersonById(localStorage.getItem('idUser')).then(response => {
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
	#containerChat{
		overflow-y:scroll;
		height: 350px;
		display: flex;
		flex-direction: column-reverse;
	}

</style>