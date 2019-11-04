<template>
  <section class="container">
    <div class="columns is-mobile is-multiline" >
    <div class="column is-one-third-desktop is-full-mobile is-full-tablet" v-for="(day) in days" :key="day.dayOfYear">
        <div class="card" v-if="tableData[day.week] !== undefined" :id="'#day' + day.dayOfYear">
          <header class="card-header">
            <p :class='{"card-header-title": true, "has-text-info": currentDay == day.dayOfYear}'>
              {{day.weekDay}} ({{$dayjs().week(day.week).startOf('week').day(day.day != 0 ? day.day : 6).format("DD.MM.YYYY")}})
            </p>
          </header>
          <div class="card-content">
            <b-notification has-icon type="is-primary" :closable="false"
            v-if="tasks[day.week][day.day] === undefined || tasks[day.week][day.day
            ].length === 0">Данні відсутні</b-notification>
            <b-table
                      v-else
                      :data="tableData[day.week][day.day]"
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
                          <p v-if="props.row.task !== undefined">
                            {{ props.row.task }}
                            <a class="detail-warn" v-if="props.row.desc != ''"
                              @click.stop="openDetail(props.row.task_id)">...</a>
                          </p>
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
    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </section>
</template>

<script>
/* eslint-disable */

import InfiniteLoading from 'vue-infinite-loading';

export default {
  components: {
    InfiniteLoading,
  },
  methods: {
    openDetail(taskId) {
      console.log(this.details);
      const key = this.details.indexOf(taskId);
      if (key === -1) {
        this.$set(this.details, this.details.length, taskId);
      } else {
        this.$delete(this.details, key);
      }
    },
    infiniteHandler($state) {
      this.$store.dispatch('tasks', { week: this.weekCounter += 1, $state });
      this.$store.dispatch('schedule', { week: this.weekCounter, $state });

      const last = this.days[this.days.length - 1].dayOfYear;
      let addDays = 3;

      for (let day = 1; day <= addDays; day += 1) {
        if (!this.addDay(this.$dayjs().dayOfYear(last + day))) {
          addDays += 1;
        }
      }
    },
    addDay(dt) {
      if (dt.day() !== 6) { // если не ВС
        this.days.push({
          dayOfYear: dt.dayOfYear(),
          day: dt.day(),
          weekDay: this.weekdays[(dt.day() !== 0 ? dt.day() : 6) - 1],
          week: dt.week(),
        });
        if(dt.dayOfYear() === this.currentDay){
          this.$nextTick(() => setTimeout(() => {
            this.$scrollTo(document.getElementById('#day' + this.currentDay));
          }, 100))
        }
        return true;
      }
      return false;
    },
  },
  data() {
    return {
      details: [],

      weekdays: [],

      currentDay: this.$dayjs().dayOfYear(),
      days: [],
      weekCounter: this.$dayjs().week() - 2,
    };
  },
  computed: {
    daysA() {
      return Object.keys(this.days);
    },
    tasks() {
      return this.$store.state.data.weeks;
    },
    agenda() {
      return this.$store.state.data.agenda;
    },
    tableData() {
      // eslint-disable-next-line
      let base = this.agenda;

      Object.keys(base).map((week) => {
        // console.log(week);
        Object.keys(base[week]).map((day) => {
          const tasks = this.tasks[week][day];
          if (tasks !== undefined && tasks.length > 0) {
            Object.keys(tasks).map((num) => {
              // console.warn(this.tasks[week][day][num]);
              const task = this.tasks[week][day][num];
              base[week][day][num].task = task.task;
              base[week][day][num].desc = task.desc;
              return true;
            });
          }
          return true;
        });
        return true;
      });
      if(base == undefined) return {};
      // console.log(base);
      return base;
    },
  },
  created() {
  },
  beforeMount() {
    const weekdays = this.$dayjs().$locale().weekdays.slice();
    // const sunday = weekdays[0];
    // weekdays.push(sunday);
    // delete weekdays[0];
    weekdays.shift();

    for (const i in weekdays) {
      if (Object.prototype.hasOwnProperty.call(weekdays, i)) {
        const val = weekdays[i];
        weekdays[i] = val[0].toUpperCase() + val.substring(1);
      }
    }
    this.weekdays = weekdays;

    const currentDay = this.$dayjs().dayOfYear();
    // const days = {};

    for (let day = currentDay - 7; day < currentDay + 14; day += 1) {
      const dt = this.$dayjs().dayOfYear(day);
      this.addDay(dt);
    }
    // this.days = days;
  },
};
</script>
