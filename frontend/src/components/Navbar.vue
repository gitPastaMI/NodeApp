<template>
  <div class="navbarComponent" v-if="hasNavbar">
    <nav>
      <span class="">
        <img src="../assets/logo.png" height="10%" width="10%">
      </span>
      <router-link v-if="isLogged" v-for="link in links" :to="link.route" exact tag="span" class="nav-item" :key="link.key">
        {{link.label}}
      </router-link>
      <router-link v-else :to="{name: 'login'}" exact tag="span" class="nav-item">Login</router-link>
      <span class="nav-item">
        {{user.username}}
      </span>
      <span class="nav-item" v-on:click="logout()">
        Logout
      </span>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {

    }
  },

  computed: {
    hasNavbar: function () {
      if (this.$route.meta.hasNavbar!==undefined) {
        return this.$route.meta.hasNavbar
      } else {
        return true
      }
    },
    isLogged: function () {
      return this.$store.getters.isLogged
    },
    user () {
      return this.$store.getters.getUser
    },
    links () {
      return this.$store.getters.getNavbarLinks
    },
  },

  methods : {
    logout () {
      this.$store.dispatch('logout')
        .then(response => {
          this.$router.push({name:'login'});
        });
    },
  },
}
</script>

<style scoped>
.navbarComponent {
  padding: 10px;
}
.nav-item {
  border: thin solid;
  border-color: teal;
  padding: 10px;
}
.nav-item:hover {
  /* font-size: 150%; */
  color:white;
  font-weight: bold;
  background-color: teal;
}
</style>
