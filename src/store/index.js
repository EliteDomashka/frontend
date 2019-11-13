import Vue from 'vue';
import Vuex from 'vuex';
/* eslint-disable no-console */

// import * as actions from './data/actions';
import * as data from './data';

Vue.use(Vuex);

console.log({
  ...data,
});

export default new Vuex.Store({
  modules: {
    data,
    // a: data,
  },
  strict: process.env.NODE_ENV !== 'production',
});
