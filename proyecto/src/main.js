// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Hello from './components/Hello.vue'

Vue.use(VueRouter);
const router = new VueRouter({
	routes: [
	{
		path: '/',
		name: 'hello', 
		component: Hello
	}
	]
});

new Vue({ // eslint-disable-line no-new
  render: (h) => h(App),
  router
}).$mount('#app');
