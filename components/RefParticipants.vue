<template>
  <div>
    <b-select></b-select>
  </div>
</template>
<script>
export default {
  methods: {
    selectParticipant(e) {
      console.log(e);
      e.pressed = true;
    }
  },
  data() {
    return {
      participantref: [
        {
          name: "kitty",
          id: 1,
          profilePicture: "",
          side: "l"
        },
        {
          name: "trumpus",
          id: 2,
          profilePicture: "",
          side: "r"
        },
        {
          name: "putiniki",
          id: 3,
          profilePicture: "",
          side: "l"
        },
        {
          name: "R-Dogan",
          id: 4,
          profilePicture: "",
          side: "r"
        },
        {
          name: "Dianca",
          id: 5,
          profilePicture: "",
          side: "l"
        }
      ]
    };
  }
};
</script>
