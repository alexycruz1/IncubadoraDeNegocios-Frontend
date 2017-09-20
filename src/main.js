// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Hello from './components/Hello.vue'
import Profile from './components/Profile.vue'
import Groups from './components/Groups.vue'
import Tasks from './components/Tasks.vue'
import LoginRegister from './components/LoginRegister.vue'
import Events from './components/Events.vue'
import Messages from './components/Messages.vue'
import Assesors from './components/Assesors.vue'
import Requests from './components/Requests.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter);
const router = new VueRouter({
	routes: [
	{
		path: '/',
		name: 'LoginRegister', 
		component: LoginRegister
	},
	{
		path: '/profile',
		name: 'profile',
		component: Profile
	},
	{
		path: '/groups',
		name: 'groups',
		component: Groups
	},
	{
		path: '/tasks',
		name: 'tasks', 
		component: Tasks
	},
	{
		path: '/events',
		name: 'Events',
		component: Events
	},
	{
		path: '/messages',
		name: 'messages', 
		component: Messages

	},
	{
		path: '/assesors',
		name: 'assesors', 
		component: Assesors
	},
	{
		path: '/requests',
		name: 'requests', 
		component: Requests
	},
	{
		path: '/home',
		name: 'home',
		component: Home
	}
	]
});

new Vue({ // eslint-disable-line no-new
  render: (h) => h(App),
  router
}).$mount('#app');
