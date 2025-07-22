<template>
  <v-app dark>
    <!-- App Bar -->
    <v-app-bar app dense color="primary">
      <v-spacer />
      
      <!-- Centered Title -->
      <v-toolbar-title class="text-center font-weight-bold">
        Online Video Player
      </v-toolbar-title>
      
      <v-spacer />

      <!-- Burger Icon shown only when logged in on /home -->
      <v-app-bar-nav-icon
        v-if="$auth.loggedIn && $route.path === '/home'"
        @click.stop="drawer = !drawer"
      />
    </v-app-bar>

    <!-- Right Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      temporary
    >
      <v-list dense>
        <v-list-item @click="logout">
          <v-list-item-action>
            <v-icon color="red">mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Page Content -->
    <v-main>
      <Nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false
    }
  },
  methods: {
    logout() {
      this.drawer = false
      this.$auth.logout({ returnTo: process.env.AUTH0_LOGOUT_REDIRECT_URI })
    }
  }
}
</script>

<style scoped>
/* Optional: Customize title or drawer here */
</style>
