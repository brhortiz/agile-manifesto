<template>
  <v-app>
    <v-main>
      <AgileManifesto/>
    </v-main>
  </v-app>
</template>

<script>
import AgileManifesto from './components/AgileManifesto';

export default {
  name: 'App',

  components: {
    AgileManifesto,
  },

  data: () => ({
    //
  }),
};
</script>
