<template>
  <div>
    <h3>Sms Dialog</h3>
    <CameraIcon @click="capture" size="24" fill-color="#FF9988" />
    <a href="#" @click="resetAll" class="align-right">Reset all</a>
    <b-card class="dialog-widget">
      <div id="chatwindow" class="container-dialog">
        <div v-if="loading" class="loader">
          <div class="message-loading"></div>
        </div>
        <div
          v-for="message in messages"
          :key="message.id"
          class="message-container"
        >
          <div
            :class="rightOrLeft(getParticipantById(message.participantId).side)"
          >
            <div
              class="thumb-container"
              v-if="getParticipantById(message.participantId).side === 'l'"
            >
              <img
                :src="getParticipantById(message.participantId).profilePicture"
                class="participant-thumb"
                style=""
              />
            </div>
            <div class="message-content">
              <div class="message-text" style="">
                <p class="message-username">
                  {{ getParticipantById(message.participantId).name }}
                </p>
                <p>{{ message.content }}</p>
              </div>
              <div class="message-timestamp">
                {{ message.timestamp }}
                <!---->
              </div>
            </div>
            <div
              class="thumb-container"
              v-if="getParticipantById(message.participantId).side === 'r'"
            >
              <img
                :src="getParticipantById(message.participantId).profilePicture"
                class="participant-thumb"
                style=""
              />
            </div>
          </div>
        </div>
      </div>
    </b-card>
    <message-manager></message-manager>
  </div>
</template>

<script>
import { mapMutations, mapState, mapGetters } from "vuex";
import { DateTime } from "luxon";
import domtoimage from "dom-to-image";
import MessageManager from "@/components/MessageManager.vue";
import CameraIcon from "vue-material-design-icons/Camera";
export default {
  name: "smsDialog",
  components: { MessageManager, CameraIcon },
  data: function() {
    return {
      loading: false,
      timestampConfig: {
        format: "HH:mm",
        relative: false
      },
      swfrom: 0
    };
  },
  props: {
    actionUrl: String,
    formId: String
  },
  computed: {
    ...mapState({
      participants: state => {
        return state.chat.participants;
      },
      messages: state => {
        return state.chat.messages;
      },
      right: state => {
        return state.chat.right;
      },
      idp: state => {
        return state.chat.idp;
      }
    }),

    ...mapGetters({
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      getParticipantById: "chat/getParticipantById"
    })
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    resetAll() {
      this.$store.dispatch("chat/resetAll");
    },
    rightOrLeft(e) {
      return e === "l" ? "left-message-body" : "right-message-body";
    },
    switchAuthor: function(author) {
      this.swfrom = author;
    },
    scrollChat: function() {
      var elem = document.querySelector("#chatwindow");
      elem.scrollTop = elem.clientHeight + 100;
      console.log(elem.clientHeight);
    },

    capture: function() {
      var elem = document.querySelector("#chatwindow");
      domtoimage
        .toJpeg(document.getElementById("chatwindow"), { quality: 0.95 })
        .then(function(dataUrl) {
          var link = document.createElement("a");
          link.download = "falseSMS.jpeg";
          link.href = dataUrl;
          link.click();
        });
    },

    removeMsg: function(msg) {
      this.chat.splice(this.chat.indexOf(msg), 1);
    },

    editMsg: function(msg) {
      this.beforeEditCache = msg.message;
      this.editedMsg = msg;
    }
  }
};
</script>

<style>
.dialog-widget {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  width: 100%;
  height: 100%;
  background: #f0eeee;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  overflow: hidden;
}

.dialog-widget .container-dialog {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-bottom: 10px;
  max-height: 100%;
}

.dialog-widget .container-dialog .message-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
}

.right-message-body {
  display: flex;
  align-items: flex-end;
  padding-right: 10px;
  justify-content: flex-end;
}
.message-content {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  flex-direction: column;
}
.right-message-body .participant-thumb {
  margin-left: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.right-message-body .message-content {
  color: #333;
  background: #eee;
}
.message-timestamp {
  padding: 2px 7px;
  border-radius: 15px;
  margin: 0;
  max-width: 50%;
  overflow-wrap: break-word;
  text-align: left;
  font-size: 10px;
  color: #bdb8b8;
  width: 100%;
  display: flex;
  align-items: center;
}

.left-message-body .participant-thumb {
  margin-right: 10px;
}

img {
  vertical-align: middle;
  border-style: none;
}
.left-message-body .message-text {
  background: #fff;
  padding: 6px 10px;
  line-height: 14px;
  border-radius: 15px;
  margin: 5px 0 5px 0;
  max-width: 70%;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-wrap;
  border-bottom-left-radius: 0px;
  word-break: break-word;
  background: rgb(251, 65, 65);
  color: rgb(255, 255, 255);
}

.left-message-body .participant-thumb {
  margin-right: 10px;
}

.participant-thumb {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

.left-message-body {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  padding-left: 10px;
}

.left-message-body .message-content {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
}
.left-message-body .participant-thumb {
  /* width: 25px;
            height: 25px;
            border-radius: 50%; */
  margin-right: 10px;
}
.message-timestamp {
  padding: 2px 7px;
  border-radius: 15px;
  margin: 0;
  max-width: 50%;
  overflow-wrap: break-word;
  text-align: left;
  font-size: 10px;
  color: #bdb8b8;
  width: 100%;
  display: flex;
  align-items: center;
}
.right-message-body .message-text {
  background: #fff;
  padding: 6px 10px;
  line-height: 14px;
  border-radius: 15px;
  margin: 5px 0 5px 0;
  max-width: 70%;
  overflow-wrap: break-word;
  text-align: left;
  white-space: pre-wrap;
  border-bottom-right-radius: 0px;
  word-break: break-word;
}
</style>
