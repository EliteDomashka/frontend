import axios from 'axios';
import { NotificationProgrammatic as Notification } from 'buefy'

if (window.localStorage.getItem('tasks') !== null) window.tasks = JSON.parse(window.localStorage.getItem('tasks'));
if (window.tasks === undefined || window.tasks === null) window.tasks = {};
const tasksStorage = window.tasks;

if (window.localStorage.getItem('lessons') !== null) window.lessons = JSON.parse(window.localStorage.getItem('lessons'));
if (window.lessons === undefined || window.lessons === null) window.lessons = {};
const lessonsStorage = window.lessons;



function getTasksByWeek(week, callback) {
  if (tasksStorage[week] !== null && tasksStorage[week] !== undefined) {
    // callback(tasksStorage[week]);
  } else {
    tasksStorage[week] = [[], [], [], [], [], []];
  }
  axios.get(`${window.API_URL}week/${week}`).then((response) => {
    const resp = response.data.response;
    //  в b-table нужно передавать лишь array, фиксим в истоках
    if (resp.length > 0 || Object.keys(resp).length > 0) {
      for (const day in resp) {
        // eslint орёт, решил вставить
        if (Object.prototype.hasOwnProperty.call(resp, day)) {
          const dayval = resp[day];
          if (typeof dayval === 'object') {
            resp[day] = Object.values(dayval);
          }
        }
      }

      if (typeof resp === 'object') tasksStorage[week] = resp;
    }


    window.localStorage.setItem('tasks', JSON.stringify(tasksStorage));
  }).catch((error) => errorHandler(error)).finally(() => {
    callback(tasksStorage[week]);
  });
  return week;
}

function getAgendaByWeek(week, callback) {
  if (lessonsStorage[week] !== null && lessonsStorage[week] !== undefined) {
    // callback(lessonsStorage[week]);
  } else {
    lessonsStorage[week] = [[], [], [], [], [], []];
  }
  axios.get(`${window.API_URL}agenda/${week}`).then((response) => {
    let resp = response.data.response;
    //  в b-table нужно передавать лишь array, фиксим в истоках
    if (resp.length > 0 || Object.keys(resp).length > 0) {
      resp = Object.values(resp);
      for (const day in resp) {
        // eslint орёт, решил вставить
        if (Object.prototype.hasOwnProperty.call(resp, day)) {
          const dayval = resp[day];
          if (typeof dayval === 'object') {
            resp[day] = Object.values(dayval);
          }
        }
      }

      if (typeof resp === 'object') lessonsStorage[week] = resp;
    }


    window.localStorage.setItem('lessons', JSON.stringify(lessonsStorage));
  }).catch((error) => errorHandler(error)).finally(() => {
    callback(lessonsStorage[week]);
  });
  return week;
}

function errorHandler(error) {
  console.log(error);
  if (error.response && error.response.data) {
    if (error.response.data.message) {
      Notification.open({
        message: error.response.data.message,
        type: 'is-danger',
        hasIcon: true,
        duration: 40000,
      });
    }
  } else {
    Notification.open({
      message: error.toString(),
      type: 'is-danger',
      hasIcon: true,
    });
  }
}
export {
  getTasksByWeek,
  getAgendaByWeek,
};
