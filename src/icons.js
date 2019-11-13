import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
// internal icons
import {
  faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle, faArrowUp, faAngleRight, faFile, faFileAudio, faFileImage,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle, faArrowUp, faAngleRight, faFile, faFileAudio, faFileImage);
Vue.component('vue-fontawesome', FontAwesomeIcon);
