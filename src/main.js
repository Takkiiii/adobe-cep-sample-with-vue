import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import store from './store/store.js';
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ja';
import locale from 'element-ui/lib/locale';

import 'element-ui/lib/theme-chalk/index.css';

locale.use(lang);
Vue.use(ElementUI);
Vue.use(Vuex);

window.vm = new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: {
    App
  },
  data: {
    csInterface: null
  },
  mounted() {
    this.csInterface = new CSInterface();
    // enable qu dom
    this.runExtendScript('app.enableQE();');
  },
  methods: {
    runExtendScript(js) {
      this.csInterface.evalScript(js, function(result) { console.log(result); }
    );
    }
  }
})