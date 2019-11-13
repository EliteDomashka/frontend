<template>
  <section class="container">
    <div class="columns is-mobile is-multiline" >
    <div class="column is-one-third-desktop is-full-mobile is-full-tablet" v-for="(day) in days" :key="day.dayOfYear" :id="'#day' + day.dayOfYear">
        <div class="card" v-if="tasks[day.week] !== undefined && tasks[day.week] !== undefined">
          <header class="card-header">
            <p :class='{"card-header-title": true, "has-text-info": currentDay === day.dayOfYear}'>{{day.weekDay}} ({{$dayjs().week(day.week).startOf('week').day(day.day != 0 ? day.day : 6).format("DD.MM.YYYY")}})</p>
          </header>
          <div class="card-content">
            <b-notification has-icon type="is-primary" :closable="false"
            v-if="tasks[day.week][day.day] === undefined || tasks[day.week][day.day
            ].length === 0">Данні відсутні</b-notification>
            <b-table
                      v-else
                      :data="tasks[day.week][day.day]"
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
                          {{ props.row.num }}
                        </b-table-column>
                        <b-table-column field="title" label="Предмет" width="40">
                          {{ props.row.title }}
                        </b-table-column>
                        <b-table-column field="task" label="Домашка">
                          <p v-if="props.row.task !== undefined">
                            {{ props.row.task }}
                            <a class="detail-warn" v-if="props.row.desc != ''" @click.stop="openDetail(props.row.task_id)">...</a>
                            <a v-if="props.row.attachment_have == true" :href="'https://t.me/EliteDomashkaBot?start=task_'+props.row.task_id" target="_blank"> 📎</a>
                          </p>
                        </b-table-column>
                      </template>
                      <template slot="detail" slot-scope="props" class="detail-text">
                        {{props.row.task}} {{props.row.desc}}
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


export default {
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
      this.$store.dispatch('tasks', {
        week: this.weekCounter += 1,
        callback: () => {
          $state.loaded();
          this.scrollTo(this.currentDay);
        },
      });

      const last = this.days[this.days.length - 1].dayOfYear;
      let addDays = 3;

      for (let day = 1; day <= addDays; day += 1) {
        if (!this.addDay(this.$dayjs().dayOfYear(last + day))) {
          addDays += 1;
        }
      }
    },
    addDay(dt) {
      if (dt.day() !== 0) { // если не ВС
        this.days.push({
          dayOfYear: dt.dayOfYear(),
          day: dt.day(),
          weekDay: this.weekdays[dt.day() - 1],
          week: dt.week(),
        });
        return true;
      }
      return false;
    },
    scrollTo(Day) {
      let day = Day;
      if (this.currentDay === day && this.$dayjs().dayOfYear(this.currentDay).day() === 0) day += 1;
      this.$nextTick(() => setTimeout(() => {
        if (!this.scrolledToCurrentDay) {
          this.$scrollTo(document.getElementById(`#day${day}`), 100, {
          // offset: -0,
            force: true,
            cancelable: false,
            onDone: () => {
              this.scrolledToCurrentDay = true;
            },
          });
        }
      }, 100));
    },
    loadImportant() {
      const currentWeek = this.$dayjs().week();
      const loadweeks = [currentWeek];
      if (this.$dayjs().day() === 0) { // если вс
        loadweeks.push(currentWeek + 1);
      }
      loadweeks.forEach((week) => {
        this.$store.dispatch('tasks', {
          week,
          callback: () => {
            if (currentWeek === week) this.scrollTo(this.currentDay);
          },
        });
      });
    },
  },
  data() {
    return {
      details: [],
      weekdays: [],

      scrolledToCurrentDay: false,
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
  },
  mounted() {
    const notify = (obj) => {
      this.$buefy.notification.open(Object.assign({
        closable: false,
        hasIcon: true,
        queue: false,
      }, obj));
    };
    const offline = () => {
      notify({
        duration: 10000,
        message: 'Оффлайн режим, використовуєтся кеш данних',
        type: 'is-danger',
      });
    };
    this.$on('offline', offline);
    this.$on('online', () => {
      notify({
        duration: 5000,
        message: 'Відновлено підключення до інтернету, оновлюємо кеш данних',
        type: 'is-success',
      });
      this.loadImportant();
    });

    if (!this.isOnline) offline();
  },
  beforeMount() {
    this.loadImportant();

    const weekdays = this.$dayjs().$locale().weekdays.slice();
    weekdays.shift();

    for (const i in weekdays) {
      if (Object.prototype.hasOwnProperty.call(weekdays, i)) {
        const val = weekdays[i];
        weekdays[i] = val[0].toUpperCase() + val.substring(1);
      }
    }
    this.weekdays = weekdays;

    const currentDay = this.$dayjs().startOf('week').dayOfYear();

    for (let day = currentDay - 7; day < currentDay + 14; day += 1) {
      const dt = this.$dayjs().dayOfYear(day);
      this.addDay(dt);
    }
  },
};
</script>
