<template>
  <div>
    <h2>Local Upload Example</h2>
    <input type="file" accept="video/*" @change="handleFileUpload" />
    <video-player v-if="localSrc" :src="localSrc" />

    <h2>YouTube Example</h2>
    <video-player :src="youtubeUrl" />

    <v-text-field
      v-model="youtubeUrl"
      label="Enter YouTube URL"
      prepend-icon="mdi-youtube"
      outlined
      class="mt-4"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      localSrc: null,
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.localSrc = URL.createObjectURL(file)
      }
    }
  }
}
</script>
