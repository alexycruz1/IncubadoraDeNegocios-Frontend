<template>
  <div id="hello">
    <img src="http://vuejs.org/images/logo.png">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="https://github.com/vuejs/vueify" target="_blank">vueify</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <button v-on:click = "showData()">Mostra</button>
    <button v-on:click = "create()">Creata</button>
    <button v-on:click = "Modify()">Modifica</button>
    <button v-on:click = "deleteB()">Borrar</button>
    <button v-on:click = "getByCode()">Get</button> 
    <button v-on:click = "addOwner()">ADD</button> 
    <button v-on:click = "removeOwner()">Remove</button> 
  </div>
</template>

<script>
import groupService from './../services/groupService'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    showData(){
      groupService.getAllGroups().then(response => {
        console.log(response.body);
      }, response => {
        alert('Error');
      })
    },
    create(){
      var obj = {
        idChat: 1,
        name: 'grupoF', 
        state: 'EstadoF'
      };

      groupService.createGroup(obj);
    },
    Modify(){
      groupService.updateGroup({name: 'GroupFM'}, 4);
    },
    deleteB(){
      groupService.deleteGroup(4);
    },
    getByCode(){
    },
    addOwner(){
      groupService.addMember({member: 1},3);
    },
    removeOwner(){
      groupService.removeMember({member: 1},3);
    }
  }
}
</script>

<style scoped>
#hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
