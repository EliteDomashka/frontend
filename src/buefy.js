import Vue from 'vue'

import Table from 'buefy/src/components/table/Table'
import TableColumn from 'buefy/src/components/table/TableColumn'
import Message from 'buefy/src/components/message/Message'
import Notification from 'buefy/src/components/notification/Notification'
import Pagination from 'buefy/src/components/pagination/Pagination'
import Modal from 'buefy/src/components/modal/Modal'
import Tooltip from 'buefy/src/components/tooltip/Tooltip'

Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Message.name, Message);
Vue.component(Notification.name, Notification);
Vue.component(Pagination.name, Pagination);
Vue.component(Modal.name, Modal);
Vue.component(Tooltip.name, Tooltip);
