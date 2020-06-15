<template>
  <div>
    <h3>Participants</h3>
    <b-form inline @submit="addParticipant">
      <b-form-group id="input-group-1" label="Avatar" label-for="input-0">
        <image-uploader
          id="input-0"
          :debug="1"
          :maxWidth="512"
          :quality="0.9"
          :autoRotate="true"
          outputFormat="verbose"
          :preview="true"
          :className="['fileinput', { 'fileinput--loaded': hasImage }]"
          capture="environment"
          accept="image/*"
          doNotResize="['gif', 'svg']"
          @input="setImage"
          @onUpload="startImageResize"
          @onComplete="endImageResize"
        ></image-uploader>
      </b-form-group>
      <b-form-group label="Name " label-for="input-1">
        <b-input
          size="sm"
          id="input-1"
          class="mb-2 mr-sm-2 mb-sm-0"
          placeholder="Jane Doe"
          v-model="newParticipant.name"
          required
        ></b-input>
      </b-form-group>
      <b-button type="submit" size="sm" variant="primary">Add</b-button>
    </b-form>
    <b-list-group style="max-width: 300px;" flush>
      <b-list-group-item
        v-for="(user, index) in participants"
        :key="index"
        class="d-flex align-items-center"
        button
        pressed
        @click="selectParticipant"
        :id="user.id"
      >
        <b-avatar
          variant="info"
          :src="user.profilePicture"
          class="mr-3"
        ></b-avatar>
        <span class="mr-auto">{{ user.name }}</span>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import ImageUploader from "vue-image-upload-resize";
export default {
  components: {
    ImageUploader
  },
  methods: {
    addParticipant(evt) {
      evt.preventDefault();
      this.newParticipant.id = this.idp;
      /* this.participants.push({
        name: this.newParticipant.name,
        id: this.newParticipant.id,
        profilePicture: this.newParticipant.profilePicture
      });*/

      this.$store.dispatch("chat/addParticipant", {
        newParticipant: this.newParticipant
      });

      this.resetParticipant();
    },
    setImage(e) {
      this.newParticipant.profilePicture = e.dataUrl;
    },
    selectParticipant(e) {
      console.log(e);
      e.pressed = true;
    },
    resetParticipant() {
      this.newParticipant.id = 0;
      this.newParticipant.name = "";
      this.newParticipant.profilePicture = "";
    }
  },
  computed: {
    ...mapState({
      participants: state => {
        return state.chat.participants;
      },
      idp: state => {
        return state.chat.idp;
      }
    })
  },
  data() {
    return {
      newParticipant: {
        name: "",
        id: 0,
        profilePicture: ""
      }
    };
  }
};
</script>
<style>
.img-preview {
  border-radius: 50% !important;
  width: 2.5em;
  height: 2.5em;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}
</style>
