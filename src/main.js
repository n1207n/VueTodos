// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';
import VueForm from 'vue-form';
import VueResource from 'vue-resource';

import store from './store';
import App from './App';

Vue.use(VueMaterial);
Vue.use(VueForm);
Vue.use(VueResource);

Vue.material.registerTheme({
  default: {
    primary: 'blue',
    accent: 'red',
  },

  teal: {
    primary: 'teal',
    accent: 'pink',
  },
});
Vue.material.setCurrentTheme('teal');

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});
