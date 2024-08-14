<template>
  <div class="header">
    <div class="logo" @click="this.$router.go('/')">irzaw</div>
    <div class="back-button"><router-link to="/login">Login</router-link></div>
  </div>
</template>

<style>
.header {
  background-color: black;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  padding: 0 0;
  z-index: 999;
}

.logo {
  color: white;
  font-size: 20px;
  padding: 10px;
}

.back-button {
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 10px;
}
</style>

<script>
export default {
  methods: {
    goBack() {
      window.history.back();
    },
  },
};
</script>
