<template>
  <v-container class="fill-height d-flex justify-center align-center text-center">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card class="pa-10" elevation="10">
          <h1 class="text-h4 font-weight-bold mb-4">Welcome to Online Video Player</h1>
          <p class="mb-6">Upload and watch videos easily, or stream from YouTube.</p>
          <v-btn color="primary" large @click="login">
            Login / Register
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    login() {
      // ✅ Correct way to trigger Auth0 login in Nuxt Auth
      this.$auth.loginWith('auth0')
    }
  }
}
</script>

<style scoped>
h1, p {
  text-align: center;
}
</style>
