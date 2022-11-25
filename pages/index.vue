<template>
  <v-row>
    <v-col cols="8" class="frame_content px-6">
      <menu-hidangan></menu-hidangan>
    </v-col>
    <v-col cols="4" class="frame_content px-6" :style="theme">
      <order></order>
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    theme() {
      return (this.$vuetify.theme.dark) ? 'background:#1E1E1E' : 'background:white'
    }
  }
};
</script>
