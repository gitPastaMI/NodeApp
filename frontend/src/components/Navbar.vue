<template>
  <div class="navbarComponent" v-if="hasNavbar">
    <nav>
      <div class="">
        <img src="../assets/logo.png">
      </div>
      <!-- <logo/>-->
      <router-link v-if="isLogged" v-for="link in links" :to="link.route" exact tag="div" class="btn" :key="link.key">
        {{link.label}}
      </router-link>
      <router-link v-else :to="login" exact tag="div" class="btn">Login</router-link>
    </nav>
    <div>
      {{user}}
      <div class="">
        <button type="button" v-on:click="logout()">Logout</button>
      </div>
    </div>
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

</style>
