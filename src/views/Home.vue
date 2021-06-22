<template>
  <v-container class="mt-2">
    <v-row>
      <v-col
        v-for="n in 3"
        :key="n"
        cols="12"
      >
        <v-card height="350" color="secondary" >
          <LineChart :station="station" />

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  
  import LineChart from '../components/LineChart';

  export default {
    name: 'Home',

    components: {
      LineChart,
    },
    created() {

    },
    data: () => ({
        station: 'Atlanta',
    }),
    methods: {
      
    }
  }
</script>
<style lang="scss">
  .v-card {
    margin: auto;
    max-width: 800px !important;
  }
</style>