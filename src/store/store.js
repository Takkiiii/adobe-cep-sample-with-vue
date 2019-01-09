import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: '',
    appVersion: '',
    clips: [],
    project: null
  },
  mutations: {
    setAppName(state, payload) {
      state.appName = payload;
    },
    setAppVersion(state, payload) {
      state.appVersion = payload;
    },
    getClips(state) {
      var cs = new CSInterface();
      cs.evalScript('getClips()', function(result) { 
        /**
         * @type {clip[]}
         */
        const json = JSON.parse(result);
        for(let clip of json) {
          clip.seconds = clip.duration.seconds;
        }
        state.clips = json;
      });
      cs.evalScript('getProject()', function(result) { 
        /**
         * @type {project}
         */
        const json = JSON.parse(result);
        state.project = json;
      });
    }
  }
});