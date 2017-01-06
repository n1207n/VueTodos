import Vue from 'vue';
import Vuex from 'vuex';

import store from './store';
import mutations from './mutations';
import plugins from './plugins';

Vue.use(Vuex);

export default new Vuex.Store({
  store,
  mutations,
  plugins,
});
