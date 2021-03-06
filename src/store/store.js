import Vue from 'vue';
import Vuex from 'vuex';
import path from 'path';
import Preset from '../models/presets';

Vue.use(Vuex);

const csInterface = window.__adobe_cep__ ? new CSInterface() : {
  hostEnvironment: {
    appName: '1.0.0',
    appVersion: 'debug'
  },
  evalScript: function (script, callback) {
    console.log("window.__adobe_cep__ is not found")
  }
};

export default new Vuex.Store({
  state: {
    appName: '',
    appVersion: '',
    clips: [],
    project: null,
    /**
     * get preset full path
     * @type {Preset[]}
     */
    presets: [],
  },
  mutations: {
    getAppName(state) {
      state.appName = csInterface.hostEnvironment.appName;
    },
    getAppVersion(state) {
      state.appVersion = csInterface.hostEnvironment.appVersion;
    },
    getProject(state) {
      csInterface.evalScript('getProject()', function (result) {
        state.project = JSON.parse(result);
      });
    },
    getClips(state) {
      //use under code then debugging with webpack dev server
      if (process.env.NODE_ENV === 'development' && !window.__adobe_cep__) {
        state.clips = [{
          index: 0,
          name: 'aaaa.mp4',
          fullPath: '/path/to/aaaa.mp4',
          seconds: 10,
          mediaType: 'Video'
        }];
        return;
      }
      csInterface.evalScript('getClips()', function (result) {
        const clips = JSON.parse(result);
        for (let clip of clips) {
          clip.seconds = clip.duration.seconds;
        }
        state.clips = clips;
      });
    },
    getPresets(state) {
      //use under code then debugging with webpack dev server
      if (process.env.NODE_ENV === 'development' && !window.__adobe_cep__) {
        state.presets = ['/path/to/sample.epr'].map(f => new Preset({
          fullPath: f
        }));
        return;
      }
      csInterface.evalScript('getPresets()', function (result) {
        const files = result.split(',');
        state.presets = files.map(f => new Preset({
          fullPath: f
        }));
      });
    }
  }
});