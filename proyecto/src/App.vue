<template>
  <div id="app">
  
  	<div class="ui inverted menu" v-show = "!logged">
  <div class="item">
    <div>
      <h1>Incubate</h1>
    </div>
  </div>
  <div class="right item">
    <div class="ui action input">
      <input v-model="username" type="text" placeholder="Nombre de usuario">
      <input v-model="password" type="password" placeholder="Contraseña">
      <router-link to = "/">
        <button class="ui primary button" v-on:click = "LogIn()">
          Inicar Sesion
        </button>
      </router-link>
    </div>
  </div>
</div>


  	<div class="ui inverted large menu" v-show = "logged">
  		<div class="ui inverted secondary pointing menu">
    		<router-link to = "/home">
        <a class="item">
      			Inicio
    		</a>
        </router-link>
        <router-link to = "/profile">
          <a class="item">
            Perfil
          </a>
        </router-link>
        <router-link to = "/assesors" v-if = "!assesor">
          <a class="item" >
            Asesores Disponibles
          </a>
        </router-link>
    		
        <router-link to = "/requests" v-else-if = "assesor">
          <a class = "item" >
            Solicitudes
          </a>
        </router-link>
    		

    		<div class="right menu">
    			<div  id = "dropMenu" class="ui pointing dropdown link item" >
      				Actividades <i class="dropdown icon" v-on:click = "showMenu()"></i>
      			<div class="ui inverted menu">
                
                <a class = "item">
                  <router-link to = '/groups'>
                    <div class = "ui black tag label">
                      Grupos
                    </div>
                    </router-link>
                </a>
                <a class = "item">
                  <router-link to = '/events'>
                    <div class = "ui black tag label">
                      Eventos
                    </div>
                    </router-link>
                </a>
                <a class = "item">
                  <router-link to = '/tasks'>
                    <div class = "ui black tag label">
                      Tareas
                    </div>
                    </router-link>
                </a>
                <a class = "item">
                  <router-link to = '/messages'>
                    <div class = "ui black tag label">
                      Mensajes
                    </div>
                    </router-link>
                </a>
      				</div>
    			  </div>
   			 </div>

          <router-link to = "/">
          <a class="item active" v-on:click = "ChangeSession()">
            Cerrar Sesion
          </a>
        </router-link>

    	</div>
    </div>
    <router-view></router-view>

    <div class="ui inverted vertical footer segment">
    	<div class="ui container">
          	<div class="ui stackable inverted divided equal height stackable grid">
            	<div class="three wide column">
              		<h4 class="ui inverted header">
                		About
              		</h4>
              		<div class="ui inverted link list">
                		<a class="item" href="homepage.html#"> Sitemap</a><a class="item" href="homepage.html#"> Contact Us</a>
              		</div>
            	</div>
            	<div class="three wide column">
              		<h4 class="ui inverted header">
                		Fundadores
              		</h4>
              		<div class="ui inverted link list">
                		<a class="item" href="homepage.html#">Manuel Padilla</a>
                    <a class="item" href="homepage.html#">Alexy Cruz</a>
              		</div>
           	 	</div>
            	<div class="seven wide column">
              		<h4 class="ui inverted header">
              		</h4>
              		<p>
                		"Lo que hacemos por nosotros mismos muere con nosotros, lo que hacemos por los demás y por el mundo permanece y es inmortal." <br><br> Albert Pike
              		</p>
            	</div>
          	</div>
        </div>
      </div>
  </div>
</template>

<script>
import personService from './services/personServices'
console.log('Storage: ', localStorage.getItem('logged'));
localStorage.setItem('logged',false);
export default {
  name: 'app',
  data(){
  	return {
  		logged:  JSON.parse(localStorage.getItem('logged')), 
  		assesor: JSON.parse(localStorage.getItem('isAdviser')),
      allSessions: [],
      allUsers: []
  	}
  },
  methods: {
      showMenu(){
        $('#dropMenu').dropdown();
      },

      LogIn(){
        var bcrypt = require('bcryptjs');
        this.allUsers = [];
        personService.getPeople().then(response => {
          this.allUsers = response.body;

          for(let i = 0; i < this.allUsers.length; i++){
            if(this.username === this.allUsers[i].username){
              bcrypt.compare(this.password,this.allUsers[i].password,this.verifyUser);
            }else{
              console.log('Usuario incorrecto');
            }
          }
        }, response => {
          alert('Error');
        });


      },
      verifyUser(err,res){
        console.log('res', res);
        if(res){
          this.logged = true;
          localStorage.setItem('logged', true);
          this.$router.push({path: "/home"});
          for(let i = 0; i < this.allUsers.length; i++){
            if(this.allUsers[i].username === this.username){
              localStorage.setItem('idUser', this.allUsers[i].IDPerson);
              localStorage.setItem('isAdviser', this.allUsers[i].isAdviser);
              this.assesor = this.allUsers[i].isAdviser;
            }
          }
        }else{
          console.log('Contraseña incorrecta');
        }
      },
      ChangeSession(){
        this.logged = false;
        localStorage.setItem('logged', false);
        localStorage.setItem('isAdviser', false);
      }
  },
  beforeCreate(){
    console.log('create');
    personService.getPeople().then(response =>{
      
        localStorage.setItem('logged', false);
        localStorage.setItem('isAdviser', false);
          for(let i = 0; i < response.body.length; i++){
            this.allUsers.push(response.body[i]);
          }
        }, response =>{
          alert('Error');
        });
  }
}
</script>

<style scoped>
  a,router-link{
    color: black;
  }
  .item{
    color: black;
  }

  .Model {
    margin-top: 1%;
    margin-bottom: 1%;
    margin-right: 50%;
    margin-left: 1%;
    padding: 1%;
    border: 1%;
    display: inline-block;
  }

  .Title {
    display: inline-block;
    margin: 1%;
    border: 1%;
    padding: 1%;
  }

  .LoginFields {
    margin: 1%;
    border: 1%;
    padding: 1%;
  }

  .Background {
    background-image: url("../../img/global-business.jpg");
  }
</style>