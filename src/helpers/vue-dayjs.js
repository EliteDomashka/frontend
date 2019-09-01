/* eslint prefer-spread: 0 */
/* eslint consistent-return: 0 */
/* eslint no-param-reassign: 0 */
import dayjs from 'dayjs';

import locale from 'dayjs/locale/uk';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.locale(locale);

const InvalidReturn = '';


export default {
  install(Vue, options = {}) {
    dayjs.locale(options.lang);
    dayjs.extend(weekOfYear);


    Vue.prototype.$dayjs = dayjs;
    Vue.filter('dayjs', (value, method, ...params) => {
      const d = dayjs(value);
      if (!d.isValid()) return InvalidReturn;
      if (method) {
        return d[method].apply(d, params);
      }
    });
  },

};
