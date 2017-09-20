<template>
    <div id="home">
        <br><br>
        <div class="ui center aligned grid">
            <div class="ui link cards">
                <div class="card">
                    <div class="image">
                        <img v-bind:src="actualUser.image">
                    </div>
                    <div class="content">
                        <div class="header">
                            {{actualUser.name}}
                        </div>
                        <div class="meta">
                            <a>{{actualUser.username}}</a>
                        </div>
                        <div class="description">
                            {{actualUser.address}}
                        </div>
                    </div>
                    <div class="extra content">
                        <span class="right floated">
                                {{actualUser.email}}
                        </span>
                        <span v-if="!emptyArray">
                            <i class="calendar outline icon"></i>
                            {{actualUser.listOfEvents.length}}
                        </span>
                        <span v-else-if="emptyArray">
                            <i class="calendar outline icon"></i>
                            0
                        </span>
                    </div>
                </div>
            </div>

            <div class="eleven wide column">
                <div class="ui two cards">
                    <div class="card">
                        <div class="content">
                            <div class="ui form">
                                <div class="field">
                                    <label>Titulo</label>
                                    <input type="text" placeholder="Titulo" v-model="title">
                                </div>
                                <div class="field">
                                    <label>Descripcion</label>
                                    <textarea rows="4" v-model="description"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button" v-on:click="createAd()">
                                    Send
                                </div>
                                <div class="ui basic secondary  button" v-on:click="uploadAdImg()">
                                    Upload Image
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br><br><br>

        <div class="ui grid">
            <div class="one wide coumn"></div>
            <div class="one wide coumn"></div>
            <div class="one wide coumn"></div>
            <div class="nine wide column">
                <div class="ui three cards">
                    <div class="ui fluid card" v-for="eventInHome in allEventsInHome">
                        <div class="image">
                            <img id="eventImageHome" v-bind:src="eventInHome.image">
                        </div>
                        <div class="content">
                            <div class="header">{{eventInHome.name}}</div>
                            <div class="meta">
                                <a>{{eventInHome.status}}</a>
                            </div>
                        </div>
                        <div class="extra content">
                            <div class="ui two buttons">
                                <div class="ui basic green button" v-on:click="joinEvent(eventInHome)">Asistir</div>
                                <div class="ui basic red button" v-on:click="quitEvent(eventInHome)">Salir</div>
                            </div>
                        </div>
                    </div>

                    <div class="ui fluid card" v-for="ad in allAds">
                        <div class="image">
                            <img id="adImageHome" v-bind:src="ad.image">
                        </div>
                        <div class="content">
                            <div class="header">{{ad.name}}</div>
                            <div class="meta">
                                <a>{{ad.description}}</a>
                            </div>
                        </div>
                        <div class="extra content">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br><br>
    </div>
</template>


<script>
    import personService from './../services/personServices'
    import advertisementService from './../services/advertisementService'
    import eventService from './../services/eventService'
    import groupService from  './../services/groupService'

    var input = 'img/imageNo.jpg';

    export default {
        data(){
            return {
                actualUser: Object,
                people: [],
                actualAd: Object,
                allAds: [],
                actualEvent: Object,
                allEventsInHome: [],
                allGroups: [],
                emptyArray: Boolean
            }
        },

        methods: {
            createAd(){
                var newAdvertisement = {name: this.title, description: this.description, image: input};

                advertisementService.createAdvertisement(newAdvertisement).then(response => {
                    this.allAds = [];
                    
                    advertisementService.getAdvertisements().then(response => {
                        for(let i = 0; i < response.body.length; i++){
                            this.allAds.push(response.body[i]);
                        }
                    }, response => {
                        alert('Error getting ads');
                    });

                }, response => {
                    alert('Error creatin ad');
                });
            },

            uploadAdImg(){
                input = document.createElement("INPUT");
			    input.setAttribute("type", "file");
			    input.click();

			    input.onchange = function () {
			        input = this.value;
				    input = input.substring(12, input.length);
				    input = "img/" + input;	
			    };
		    },

            joinEvent(eventInHome){
                this.actualEvent = eventInHome;

				personService.addEvent({event: this.actualEvent.IDEvent}, this.actualUser.IDPerson).then(response => {
				}, response => {
					alert('Error');
				});

				eventService.addPersonToEvent({person: this.actualUser.IDPerson}, this.actualEvent.IDEvent).then(respone =>{
				}, response => {
					alert('Error');
				});
			},

            quitEvent(eventInHome){
                this.actualEvent = eventInHome;

                personService.deleteEvent({event: this.actualEvent.IDEvent}, this.actualUser.IDPerson).then(response => {
                }, response => {
                    alert('Error removing event from person');
                });

                eventService.deletePersonInEvent({}, ).then(response => {
                }, response => {
                    alert('Error removing person from event');
                })
            }
        },

        beforeCreate(){
            this.allEventsInHome = [];

            personService.getPersonById(localStorage.getItem('idUser')).then(response => {
                this.actualUser = response.body[0];
                if(this.actualUser.listOfEvents === undefined){
                    this.emptyArray = true;
                }else{
                    this.emptyArray = false;
                }
            }, response => {
                alert('Error getting person by ID');
            });

                personService.getPeople().then(response => {
                    for(let i = 0; i < response.body.length; i++){
                        this.people.push(response.body[i]);
                    }

                    advertisementService.getAdvertisements().then(response => {
                        for(let i = 0; i < response.body.length; i++){
                            this.allAds.push(response.body[i]);
                            console.log('Este es ad: ', this.allAds[i]);
                        }

                        eventService.getEvents().then(response => {
                            for(let i = 0; i < response.body.length; i++){
                                this.actualEvent = response.body[i];
                                this.allEventsInHome.push(this.actualEvent);
                                console.log('Este es evento: ', this.actualEvent);


                                groupService.getAllGroups().then(response => {
                                    for(let i = 0; i < response.body.length; i++){
                                        this.allGroups.push(response.body[i]);
                                    }

                                    if(this.allGroups === undefined){
                                        console.log('no hay grupos');
                                    }else{
                                        console.log('hay grupos');
                                        for(let i = 0; i < this.allGroups.length; i++){
                                            if(this.allGroups[i].events.length != undefined || this.allGroups[i].events.length === 0){
                                                for(let j = 0; j < this.allGroups[i].events.length; j++){
                                                    for(let k = 0; k < this.allEventsInHome.length; k++){
                                                        if(this.allEventsInHome[k].IDEvent === this.allGroups[i].events[j]){
                                                            this.allEventsInHome.splice(k, 1);
                                                            console.log('coincide');
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }, response => {
                                    alert('Error getting groups');
                                });
                                
                            }
                        }, response => {
                            alert('Error getting events');   
                        });
                    }, response => {
                        alert('Error getting ads')
                    });
                }, response => {
                    alert('Error getting people');
                });
            }
    }


</script>


<style scoped>

.FixCards {
    margin-top: 10%
}

</style>