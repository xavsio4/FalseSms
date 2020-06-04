<template>
  <div class="row">
    <div class="col-md-6">
      <img alt="FalseSMS" src="../assets/logofs.png" />
      <br />
      <h2>Create funny false dialogs and get the Jpeg to share it.</h2>
      <br />
      <H4>1. Name the texters</H4>

      <div class="row">
        <div class="col-md-6">
          <label>Texter 1</label>
          <input
            class="form-control input-sm"
            size="10"
            type="text"
            v-model="texters[0]"
          />
          <p class="message message-in">
            <strong>{{ texters[0] | capitalize }}</strong>
          </p>
        </div>

        <div class="col-md-6">
          <label>Texter 2</label>
          <input
            class="form-control input-sm"
            size="20"
            type="text"
            v-model="texters[1]"
          />
          <p class="message message-out">
            <strong>{{ texters[1] | capitalize }}</strong>
          </p>
        </div>
      </div>
      <!-- //row -->
      <br />
      <h4>2. Now, type a dialog in the sms window</h4>
      <br />
      <h4>3. Satisfied ? Download the image</h4>
      <a class="btn btn-success" @click.prevent="getImage()" href="#"
        >Download image</a
      >
      <p class="hint-block">
        Nothing personal is stored with this site, not even a cookie. We only
        increase the click of the download counter.
      </p>
      <br />
      <p>
        <strong
          >The download button has been clicked times. We assume then that the
          same number of false dialogs have been created.
        </strong>
      </p>
    </div>
    <!-- //col-md-4 -->

    <div class="col-md-6">
      <div class="panel panel-default">
        <div class="panel-heading text-center">
          <div class="row">
            <div class="col-md-2">
              <div class="icon">
                <span class="glyphicon glyphicon-chevron-left"></span>
              </div>
            </div>
            <div class="col-md-offset-3 col-md-2">
              <div id="contact">
                <span
                  class="glyphicon glyphicon-user"
                  aria-hidden="true"
                ></span>
              </div>
              {{ texters[0] | capitalize }}
            </div>
            <div class="col-md-offset-3 col-md-2">
              <div class="icon">
                <span class="glyphicon glyphicon-info-sign"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-body" id="chatwindow">
          <div class="date"><span class="bold">Today</span> 11:54</div>
          <div v-for="msg in chat" class="row">
            <span
              v-bind:class="[
                msg.from === 0
                  ? 'author-left pull-left'
                  : 'author-right pull-right'
              ]"
              >{{ texters[msg.from] }}</span
            >
            <div
              v-bind:class="[
                'message',
                msg.from === 0
                  ? 'message-in pull-left'
                  : 'message-out pull-right'
              ]"
            >
              {{ msg.message }}
            </div>
          </div>
        </div>
        <div class="panel-footer">
          <form>
            <div class="input-group">
              <span class="input-group-btn">
                <a
                  href="#"
                  @click.prevent="switchAuthor(0)"
                  v-bind:class="[
                    'btn btn-default',
                    this.swfrom === 0 ? 'selected-author' : ''
                  ]"
                  >{{ texters[0] }}</a
                >
                <a
                  href="#"
                  @click.prevent="switchAuthor(1)"
                  v-bind:class="[
                    'btn btn-default',
                    this.swfrom === 1 ? 'selected-author' : ''
                  ]"
                  >{{ texters[1] }}</a
                >
              </span>
              <input
                autofocus
                autocomplete="off"
                placeholder="What needs to be done?"
                v-model="newMsg"
                @keyup.enter.prevent="addMsg"
                type="text"
                class="form-control"
              />

              <span class="input-group-btn">
                <a
                  href="#"
                  @keyup.enter.prevent="addMsg"
                  @click.prevent="addMsg"
                  class="btn btn-default"
                  ><span class="glyphicon glyphicon-send"></span
                ></a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import domtoimage from "dom-to-image";
export default {
  name: "smsDialog",
  components: {},
  data: function() {
    return {
      texter1: "john",
      texter2: "Paty",
      newMsg: "",
      editedMsg: "",
      texters: ["john", "paty"],
      swfrom: 0,
      chat: [
        { from: 0, message: "Hello" },
        { from: 1, message: "Hi" }
      ]
    };
  },
  props: {
    actionUrl: String,
    formId: String
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  methods: {
    switchAuthor: function(author) {
      this.swfrom = author;
    },

    scrollChat: function() {
      var elem = document.querySelector("#chatwindow");
      elem.scrollTop = elem.clientHeight + 100;
      console.log(elem.clientHeight);
    },

    getImage: function() {
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

    addMsg: function() {
      var value = this.newMsg && this.newMsg.trim();
      if (!value) {
        return;
      }
      this.chat.push({
        from: this.swfrom,
        message: value
      });
      this.newMsg = "";
      this.scrollChat();
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
form.chat * {
  transition: all 0.5s;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

form.chat {
  margin: 0;
  cursor: default;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE/Edge */
  user-select: none;
}

form.chat span.spinner {
  -moz-animation: loading-bar 1s 1;
  -webkit-animation: loading-bar 1s 1;
  animation: loading-bar 1s 1;
  display: block;
  height: 2px;
  background-color: #00e34d;
  transition: width 0.2s;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 4;
}

form.chat .messages {
  display: block;
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  height: 90%;
  width: 100%;
  padding: 2% 3%;
  border-bottom: 1px solid #ecf0f1;
}

form.chat ::-webkit-scrollbar {
  width: 3px;
  height: 1px;
  transition: all 0.5s;
  z-index: 10;
}
form.chat ::-webkit-scrollbar-track {
  background-color: white;
}
form.chat ::-webkit-scrollbar-thumb {
  background-color: #bec4c8;
  border-radius: 3px;
}

form.chat .message {
  display: block;
  width: 98%;
  padding: 0.5%;
}

form.chat .message p {
  margin: 0;
}

form.chat .myMessage,
form.chat .fromThem {
  max-width: 50%;
  word-wrap: break-word;
  margin-bottom: 20px;
}

form.chat .message:hover .myMessage {
  -webkit-transform: translateX(-130px);
  transform: translateX(-130px);
}

form.chat .message:hover .fromThem {
  -webkit-transform: translateX(130px);
  transform: translateX(130px);
}

form.chat .message:hover date {
  opacity: 1;
}

form.chat .myMessage,
.fromThem {
  position: relative;
  padding: 10px 20px;
  color: white;
  border-radius: 25px;
  clear: both;
  font: 400 15px "Open Sans", sans-serif;
}

form.chat .myMessage {
  background: #00e34d;
  color: white;
  float: right;
  clear: both;
  border-bottom-right-radius: 20px 0px\9;
}

form.chat .myMessage:before {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: -2px;
  right: -8px;
  height: 19px;
  border-right: 20px solid #00e34d;
  border-bottom-left-radius: 16px 14px;
  -webkit-transform: translate(0, -2px);
  transform: translate(0, -2px);
  border-bottom-left-radius: 15px 0px\9;
  transform: translate(-1px, -2px) \9;
}

form.chat .myMessage:after {
  content: "";
  position: absolute;
  z-index: 1;
  bottom: -2px;
  right: -42px;
  width: 12px;
  height: 20px;
  background: white;
  border-bottom-left-radius: 10px;
  -webkit-transform: translate(-30px, -2px);
  transform: translate(-30px, -2px);
}

form.chat .fromThem {
  background: #e5e5ea;
  color: black;
  float: left;
  clear: both;
  border-bottom-left-radius: 30px 0px\9;
}
form.chat .fromThem:before {
  content: "";
  position: absolute;
  z-index: 2;
  bottom: -2px;
  left: -7px;
  height: 19px;
  border-left: 20px solid #e5e5ea;
  border-bottom-right-radius: 16px 14px;
  -webkit-transform: translate(0, -2px);
  transform: translate(0, -2px);
  border-bottom-right-radius: 15px 0px\9;
  transform: translate(-1px, -2px) \9;
}

form.chat .fromThem:after {
  content: "";
  position: absolute;
  z-index: 3;
  bottom: -2px;
  left: 4px;
  width: 26px;
  height: 20px;
  background: white;
  border-bottom-right-radius: 10px;
  -webkit-transform: translate(-30px, -2px);
  transform: translate(-30px, -2px);
}

form.chat date {
  position: absolute;
  top: 10px;
  font-size: 14px;
  white-space: nowrap;
  vertical-align: middle;
  color: #8b8b90;
  opacity: 0;
  z-index: 4;
}

form.chat .myMessage date {
  left: 105%;
}

form.chat .fromThem date {
  right: 105%;
}

form.chat input {
  font: 400 13px "Open Sans", sans-serif;
  border: 0;
  padding: 0 15px;
  height: 10%;
  outline: 0;
}

form.chat input[type="text"] {
  width: 73%;
  float: left;
}

form.chat input[type="submit"] {
  width: 23%;
  background: transparent;
  color: #00e34d;
  font-weight: 700;
  text-align: right;
  float: right;
}

form.chat .myMessage,
form.chat .fromThem {
  font-size: 12px;
}

form.chat .message:hover .myMessage {
  transform: translateY(18px);
  -webkit-transform: translateY(18px);
}

form.chat .message:hover .fromThem {
  transform: translateY(18px);
  -webkit-transform: translateY(18px);
}

form.chat .myMessage date,
form.chat .fromThem date {
  top: -20px;
  left: auto;
  right: 0;
  font-size: 12px;
}

form.chat .myMessage,
form.chat .fromThem {
  max-width: 90%;
}

@-moz-keyframes loading-bar {
  0% {
    width: 0%;
  }
  90% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}

@-webkit-keyframes loading-bar {
  0% {
    width: 0%;
  }
  90% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}

@keyframes loading-bar {
  0% {
    width: 0%;
  }
  90% {
    width: 90%;
  }
  100% {
    width: 100%;
  }
}

/* DEMO */
.iphone {
  width: 300px;
  height: 609px;
  background-image: url("http://www.adobewordpress.com/tasarim/images/iphone6.png");
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
}

.border {
  position: absolute;
  top: 12.3%;
  right: 7%;
  left: 7%;
  bottom: 12%;
  overflow: hidden;
}

a.article {
  position: fixed;
  bottom: 15px;
  left: 15px;
  display: table;
  text-decoration: none;
  color: white;
  background-color: #00e34d;
  padding: 10px 20px;
  border-radius: 25px;
  font: 400 15px "Open Sans", sans-serif;
}

.panel {
  width: 500px;
  border: 1px #a0a0a0 solid;
}

.icon {
  height: 70px;
  padding-top: 23px;
}
#contact {
  width: 50px;
  height: 50px;
  margin: auto;
  padding: 7px 8px 7px 8px;
  background-color: #a4a4a4;
  border-radius: 25px 25px 25px 25px;
}

.glyphicon-info-sign,
.glyphicon-chevron-left {
  font-size: 25px;
  color: #37a7fd;
}
.glyphicon-user {
  font-size: 35px;
  color: #ffffff;
}

.panel-body {
  height: 350px;
  overflow-y: scroll;
}

.date {
  color: #a4a4a4;
  text-align: center;
  margin-bottom: 5px;
}

.bold {
  font-weight: bold;
}

.message {
  font-size: 1.2em;
  width: auto;
  max-width: 300px;
  border-radius: 15px;
  padding: 10px;
  margin-bottom: 10px;
}
.message-in {
  background-color: #e5e5ea;
  margin-left: 20px;
}
.message-out {
  background-color: #22d351;
  margin-right: 20px;
  color: #ffffff;
}

.glyphicon-send,
.glyphicon-camera {
  color: #848484;
}

.author-left {
  margin-left: 3px;
}

.author-right {
  margin-right: 3px;
}

.selected-author {
  background: #b0b0b3 !important;
}

#chatwindow {
  background-color: #fff;
}
</style>
