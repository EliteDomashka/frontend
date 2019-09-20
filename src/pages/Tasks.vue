<template>
  <section>
    <b-button class="is-medium is-fullwidth" @click="infiniteHandler(null)">Минула неділя</b-button>
    <div v-for="week in weeks">
      <div class="hero is-fullheight" :id="'week'+week">
        <div class="hero-body">
          <div class="container">
            <p class="title">
              Неділя №{{week}} ({{$dayjs().week(week).startOf('week').format("DD.MM.YYYY")}} - {{$dayjs().week(week).startOf('week').add(4, 'day').format("DD.MM.YYYY")}})
            </p>
            <div class="columns is-mobile is-multiline">
              <div class="column is-one-third-desktop is-full-mobile is-full-tablet"
                   v-scroll-reveal.reset
                   v-for="(weekday, day) in weekdays" :key="day">
                <div class="card">
                  <header class="card-header">
                    <p class="card-header-title">{{weekday}} ({{$dayjs().week(week).startOf('week').add(day, 'day').format("DD.MM.YYYY")}})</p>
                  </header>
                  <div class="card-content">
                    <b-notification has-icon type="is-primary" :closable="false" v-if="tasks[week][day] === undefined || tasks[week][day].length === 0">Данні відсутні</b-notification>
                    <b-table
                      v-else
                      :data="tasks[week][day]"
                      detailed
                      detail-key="task_id"
                      :has-detailed-visible="(row) => {
                                        if (row.desc === '') return false;
                                        return true;
                                    }"
                      :opened-detailed="details"
                      :mobile-cards=false
                    >
                      <template slot-scope="props">
                        <b-table-column field="name" label="#" width="40" numeric>
                          {{ props.row.num+1 }}
                        </b-table-column>
                        <b-table-column field="title" label="Предмет" width="40">
                          {{ props.row.title }}
                        </b-table-column>
                        <b-table-column field="task" label="Домашка">
                          {{props.row.task}}
                          <a class="detail-warn" v-if="props.row.desc != ''" @click.stop="openDetail(props.row.task_id)">...</a>
                        </b-table-column>
                      </template>
                      <template slot="detail" slot-scope="props">
                        <p class="detail-text" v-html="props.row.desc"></p>
                      </template>
                    </b-table>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>
    <br>
    <infinite-loading
      @infinite="infinitebottopHandler"
      spinner="waveDots"
      :distance="1"></infinite-loading>
  </section>
</template>

<script>
import { getTasksByWeek } from '../helpers/DataProvider';

export default {
  name: 'Tasks',
  data() {
    return {
      tasks: {},
      weeks: [],
      details: []
    };
  },
  computed: {
    weekdays() {
      const weekdays = this.$dayjs().$locale().weekdays.slice();
      weekdays.shift();

      for (const i in weekdays) {
        const val = weekdays[i];
        weekdays[i] = val[0].toUpperCase() + val.substring(1);
      }
      return weekdays;
    },
  },
  beforeMount() {
    const currectWeek = this.$dayjs().week();
    this.getWeek(currectWeek - 1, null, false);
    this.getWeek(currectWeek);
  },
  methods: {
    openDetail(task_id){
      console.log(this.details);
      var key = this.details.indexOf(task_id);
      if(key === -1){
        this.$set(this.details, this.details.length, task_id);
      }else{
        this.$delete(this.details, key);
      }
    },

    getWeek(week, callback = null, scroll = true) {
      const data = this.tasks[week];
      if (data === undefined || data === null || (typeof data === 'object' && Object.keys(data).length === 0)) {
        getTasksByWeek(week, (response) => {
          if (this.weeks.indexOf(week) === -1) {
            if (this.weeks.length > 0 && this.weeks[0] > week) {
              this.weeks.unshift(week);
            } else {
              this.weeks.push(week);
            }
          }
          this.tasks[week] = response;
          if (scroll) this.$nextTick(() => this.$scrollTo(`#week${week}`, 500, { offset: 0, cancelable: false }));

          if (callback !== null) callback();
        });
      } else if (callback !== null) callback();
    },
    infiniteHandler($state) {
      if (this.weeks[0] !== undefined) this.infinteBase($state, this.weeks[0] - 1, false);
      else $state.reset();
    },
    infinitebottopHandler($state) {
      const len = this.weeks.length;
      if (this.weeks[len - 1] !== undefined) {
        const week = this.weeks[len - 1] + 1;
        this.infinteBase($state, week, true);
      } else $state.reset();
    },
    infinteBase($state, week) {
      if (week > 60 || week < 30) return;
      this.getWeek(week, () => {
        console.log(`#week${week}`);
        if ($state !== null) {
          setTimeout(() => {
          // $state.reset()
            $state.loaded();
          }, 100);
        }
      });
    },
  },
};
</script>

<style scoped>
  span div{
    display: inline;
  }
  .detail-text{
    white-space: pre-line;
  }
  .detail-warn{
    color: #0077b5;
    font-size: x-large;
    font-weight: bold;
  }

</style>
