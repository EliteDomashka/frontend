import Vue from 'vue';

import Table from 'buefy/src/components/table/Table.vue';
import TableColumn from 'buefy/src/components/table/TableColumn.vue';
import Message from 'buefy/src/components/message/Message.vue';
import Notification from 'buefy/src/components/notification/Notification.vue';
import Pagination from 'buefy/src/components/pagination/Pagination.vue';
import Modal from 'buefy/src/components/modal/Modal.vue';
import Tooltip from 'buefy/src/components/tooltip/Tooltip.vue';

Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Message.name, Message);
Vue.component(Notification.name, Notification);
Vue.component(Pagination.name, Pagination);
Vue.component(Modal.name, Modal);
Vue.component(Tooltip.name, Tooltip);
