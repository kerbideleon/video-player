import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering
  ssr: false,

  // Global page headers
  head: {
    titleTemplate: '%s - online-video-player',
    title: 'online-video-player',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS
  css: [
    'video.js/dist/video-js.css',                      // video.js styling
    'nuxt-video-player/src/assets/css/main.css'        // optional wrapper CSS
  ],

  // Plugins
  plugins: [
    { src: '~/plugins/videojs.js', mode: 'client' }     // video.js plugin
  ],

  // Auto import components
  components: true,

  // Modules for dev and build
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  // Nuxt modules
  modules: [],

  // Vuetify configuration
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

  // Build configuration
  build: {
    transpile: ['video.js', 'videojs-youtube'],
    extend(config) {
      config.resolve.alias.videojs = 'video.js'
    }
  }
}
