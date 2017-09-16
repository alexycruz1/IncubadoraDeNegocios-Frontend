<template>
  <div id="app">
  	<div class = "ui inverted segment" v-if = !logged>
  		<h1>Incubate</h1>
  	</div>
  	<div class="ui inverted large menu" v-else-if = logged>
  		<div class="ui inverted secondary pointing menu">
    		<a class="item">
      			Inicio
    		</a>
        <router-link to = "/profile">
          <a class="item active">
            Perfil
          </a>
        </router-link>
    		<a class="item" v-if = !assesor>
      			Asesores Disponibles
    		</a>
    		<a class = "item" v-else-if = assesor>
    			Solicitudes
    		</a>

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
                  <router-link to = '/'>
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
                  <router-link to = '/'>
                    <div class = "ui black tag label">
                      Mensajes
                    </div>
                    </router-link>
                </a>
      				</div>
    			</div>
   			 </div>
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
                		<a class="item" href="homepage.html#"> Ramiro Zuniga</a><a class="item" href="homepage.html#"> Cristian lopez</a><a class="item" href="homepage.html#"> Josue Guerrero</a><a class="item" href="homepage.html#"> Manuel Padilla</a>
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
export default {
  name: 'app',
  data(){
  	return {
  		logged: true, 
  		assesor: true
  	}
  },
  methods: {
      showMenu(){
        $('#dropMenu').dropdown();
      }
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
</style>
