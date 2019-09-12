<template>
  <div id="app">
    <keep-alive>
      <Tasks v-if="action===1"></Tasks>
      <Lessons v-else></Lessons>
    </keep-alive>

    <div class="floatbuuton">
      <b-button type="is-info"
                rounded
                size="is-large"
                :icon-right="action ? 'book' : 'file-document-box'"
                @click="toggle"/>
<!--      <button class="button is-rounded is-medium">-->
<!--        <div>-->
<!--        <b-icon icon="file-document-box" size="is-small"></b-icon>-->
<!--&lt;!&ndash;        <b-icon icon="book"></b-icon>&ndash;&gt;-->
<!--        </div>-->
<!--      </button>-->
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      action: 1,
    };
  },
  methods: {
    toggle() {
      if (this.action === 0) this.action = 1; else this.action = 0;
    },
  },
};
</script>
<style>
  .floatbuuton {
    z-index: 4;
    bottom: 16px;
    position: fixed;
    right: 16px;
  }

  /*style="overflow: scroll;"*/
</style>
