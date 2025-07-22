<template>
  <v-container>
    <v-row>
      <!-- Local Upload Section -->
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title>
            <span class="headline">📁 Local Video Upload</span>
          </v-card-title>

          <v-card-text>
            <v-file-input
              label="Choose a video file"
              accept="video/*"
              outlined
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
                controls
                allowFullscreen
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- YouTube Video Section -->
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title>
            <span class="headline">📺 YouTube Link</span>
          </v-card-title>

          <v-card-text>
            <v-text-field
              label="Paste YouTube URL"
              v-model="youtubeUrl"
              outlined
              :disabled="!!youtubeSrc"
            />
            <v-btn
              color="blue"
              @click="playYouTube"
              :disabled="!youtubeUrl || youtubeSrc"
              class="mb-3"
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
                allowFullscreen
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
</style>
