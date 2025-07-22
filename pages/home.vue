<template>
  <v-container>
    <v-row dense>
      <!-- Local Upload Section -->
      <v-col cols="12" md="6">
        <v-card outlined color="primary" dark>
          <v-card-title>
            <v-icon class="mr-2">mdi-folder-video</v-icon>
            <span class="headline font-weight-bold">Local Video Upload</span>
          </v-card-title>

          <v-card-text>
            <v-file-input
              label="Choose a video file"
              accept="video/*"
              outlined
              dense
              hide-details
              color="white"
              @change="onFileChange"
              :disabled="!!localSrc"
            />

            <div v-if="localSrc" class="mt-4 position-relative">
              <v-btn icon small color="red" @click="removeLocal" class="remove-btn">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <video-player
                :src="localSrc"
                playsinline
                webkit-playsinline
                x-webkit-airplay="allow"
                controls
                :playerOptions="localPlayerOptions"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- YouTube Video Section -->
      <v-col cols="12" md="6">
        <v-card outlined color="primary" dark>
          <v-card-title>
            <v-icon class="mr-2">mdi-youtube</v-icon>
            <span class="headline font-weight-bold">YouTube Link</span>
          </v-card-title>

          <v-card-text>
            <v-text-field
              label="Paste YouTube URL"
              v-model="youtubeUrl"
              outlined
              dense
              hide-details
              color="white"
              :disabled="!!youtubeSrc"
            />

            <v-btn
              block
              color="red darken-1"
              class="mb-3"
              @click="playYouTube"
              :disabled="!youtubeUrl || youtubeSrc"
            >
              Play YouTube
            </v-btn>

            <div v-if="youtubeSrc" class="position-relative">
              <v-btn icon small color="red" @click="removeYoutube" class="remove-btn">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <video-player
                :src="youtubeSrc"
                techOrder="youtube"
                playsinline
                controls
                :playerOptions="youtubePlayerOptions"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoPlayer from 'nuxt-video-player'

export default {
  components: { VideoPlayer },
  data() {
    return {
      localSrc: null,
      youtubeUrl: '',
      youtubeSrc: null
    }
  },
  computed: {
    localPlayerOptions() {
      return {
        techOrder: ['html5'],
        controlBar: {
          fullscreenToggle: true
        },
        html5: {
          nativeControlsForTouch: false
        }
      }
    },
    youtubePlayerOptions() {
      return {
        techOrder: ['youtube'],
        controlBar: {
          fullscreenToggle: true
        },
        youtube: {
          modestbranding: 1,
          rel: 0
        }
      }
    }
  },
  methods: {
    onFileChange(file) {
      if (file) {
        this.localSrc = URL.createObjectURL(file)
      }
    },
    removeLocal() {
      this.localSrc = null
    },
    playYouTube() {
      const match = this.youtubeUrl.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/)
      if (match) {
        this.youtubeSrc = `https://www.youtube.com/watch?v=${match[1]}`
      } else {
        alert('Invalid YouTube URL')
      }
    },
    removeYoutube() {
      this.youtubeSrc = null
      this.youtubeUrl = ''
    }
  }
}
</script>

<style scoped>
.remove-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  z-index: 10;
}

video {
  width: 100%;
  height: auto;
  max-height: 400px;
}

.vjs-fullscreen video {
  width: 100vw !important;
  height: 100vh !important;
}
</style>
