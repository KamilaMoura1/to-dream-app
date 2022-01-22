<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" v-if="notIsLoginPage">
      <b-navbar-brand href="#"><img src="https://i.ibb.co/nc9F8q7/image-6483441.jpg" alt="image-6483441" border="0" class="logo"/></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/">Objective</b-nav-item>
          <b-nav-item to="/form">Create goal</b-nav-item>
        </b-navbar-nav>
      </b-collapse>

      <b-navbar-nav right>
        <b-nav-item
          @click="logout()"
          v-b-tooltip.hover
          title="Logout">
          <i class="fas fa-sign-out-alt"></i>
        </b-nav-item>
      </b-navbar-nav>
    </b-navbar>

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
  computed: {
    notIsLoginPage() {
      return this.$route.name !== "login" && this.$route.name !== "register";
    }
  },

  methods: {
    logout() {
      localStorage.removeItem('authUser');
      this.$router.push({name: "login"});
    }
  }
}
</script>


<style>
.logo{
  width: 5vh;
  height: 5vh;
  text-align: center;
  align-items: center;
}

.fade-enter-active, .fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter, .fade-leave {
  opacity: 0;
}
</style>


