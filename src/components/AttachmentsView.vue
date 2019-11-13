<template>
  <section>
    <div v-for="attachment in attachments" :key="attachment.id">
      <button class="button is-primary" @click="openAttachment(attachment)">
        <b-icon :icon="typeToIcon(attachment.type)"></b-icon>
        <span>{{attachment.filename !== null ? attachment.filename.substring(0, 30) : attachment.type}}</span>
      </button>
    </div>
    <b-modal :active.sync="imageModal.active">
      <p class="image is-4by3">
        <img :src="imageModal.img_src">
      </p>
    </b-modal>
  </section>
</template>

<script>
export default {
  name: 'AttachmentsView',
  props: ['task_id'],
  data() {
    return {
      attachments: [],
      imageModal: {
        active: false,
        img_src: '',
      },
    };
  },
  beforeMount() {
    this.getAttachments();
  },
  methods: {
    openAttachment(attachment) {
      if (attachment.type === 'Photo') {
        this.imageModal.img_src = this.getAttachmentUrl(attachment.id);
        this.imageModal.active = true;
      } else {
        const win = window.open(this.getAttachmentUrl(attachment.id), '_blank');
        win.focus();
      }
    },
    getAttachmentUrl(attachmentId) {
      return `${this.$axios.defaults.baseURL}attachment/${this.task_id}/${attachmentId}`;
    },
    async getAttachments() {
      const resp = await this.$axios.get(`/attachments/${this.task_id}`);
      this.attachments = resp.data.response;
    },
    typeToIcon(type) {
      return {
        document: 'file',
        photo: 'file-image',
        audio: 'file-audio',
        voice: 'microphone',
      }[type.toLowerCase()];
    },
  },
};
</script>

<style scoped>

</style>
