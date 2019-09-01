import axios from 'axios';

if (window.localStorage.getItem('tasks') !== null) window.tasks = JSON.parse(window.localStorage.getItem('tasks'));
if (window.tasks === undefined || window.tasks === null) window.tasks = {};
const tasksStorage = window.tasks;
console.log('laoded');
console.log(tasksStorage);

if (window.localStorage.getItem('lessons') !== null) window.lessons = JSON.parse(window.localStorage.getItem('lessons'));
if (window.lessons === undefined || window.lessons === null) window.lessons = {};
const lessonsStorage = window.lessons;
console.log(lessonsStorage);


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
  }).catch((error) => {
    console.log(error);
  }).finally(() => {
    callback(tasksStorage[week]);
  });
  return week;
}

function getAgendaByWeek(week, callback) {
  if (lessonsStorage[week] !== null && lessonsStorage[week] !== undefined) {
    // callback(tasksStorage[week]);
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


    window.localStorage.setItem('tasks', JSON.stringify(lessonsStorage));
  }).catch((error) => {
    console.log(error);
  }).finally(() => {
    callback(lessonsStorage[week]);
  });
  return week;
}

export default {
  getTasksByWeek,
  getAgendaByWeek,
};
export {
  getTasksByWeek,
  getAgendaByWeek,
};
