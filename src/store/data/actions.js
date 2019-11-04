/* eslint-disable no-console */
import { getTasks, getSchedule } from '../../helpers/DataProvider';

export async function tasks({ commit }, { week, $state }) {
  // console.info(week);
  const Tasks = await getTasks(week);
  // console.error(Tasks);
  commit('week', {
    week,
    obj: Tasks,
    $state,
  });
}

export async function schedule({ commit }, { week, $state }) {
  // console.info(week);
  const Lessons = await getSchedule(week);
  // console.error(Lessons);
  commit('agenda', {
    week,
    obj: Lessons,
    $state,
  });
}
