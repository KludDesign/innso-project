<template>
  <v-app light>

    <navigation />

    <v-content>
      <v-container fluid>

        <nuxt />

      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navigation from '~/components/Navigation.vue';

export default {
  components: {
    Navigation
  }
}
</script>
