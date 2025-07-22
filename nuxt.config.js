import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  head: {
    titleTemplate: '%s - online-video-player',
    title: 'Online Video Player',
    htmlAttrs: { lang: 'en' },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  css: [
    'video.js/dist/video-js.css',
    'nuxt-video-player/src/assets/css/main.css'
  ],

  plugins: [
    { src: '~/plugins/videojs.js', mode: 'client' }
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: '/welcome',                  // Shown to unauthenticated users
      logout: '/welcome',                // After logout
      callback: '/callback',             // Where Auth0 redirects after login
      home: '/home'                      // After successful login
    },
    cookie: {
      options: {
        secure: true,
        domain: '.vercel.app'           // Needed for Vercel deployment
      }
    },
    strategies: {
      auth0: {
        domain: process.env.AUTH0_DOMAIN,
        clientId: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        audience: '',
        responseType: 'code',
        codeChallengeMethod: '',
        redirectUri: process.env.AUTH0_REDIRECT_URI,
        logoutRedirectUri: process.env.AUTH0_LOGOUT_REDIRECT_URI,
        scope: ['openid', 'profile', 'email']
      }
    }
  },

  axios: {
    baseURL: '/'
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
    transpile: ['video.js', 'videojs-youtube'],
    extend(config) {
      config.resolve.alias.videojs = 'video.js'
    }
  },

  router: {
    middleware: [] // You can add ['auth'] for global protection if needed
  }
}
