import Vue from 'vue';

export function week(state, data) {
  // eslint-disable-next-line no-shadow
  const { week, obj, callback } = data;
  Vue.set(state.weeks, week, obj);
  callback();
}
