<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      color="secondary"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Weather Dashboard
          </v-list-item-title>
          <v-list-item-subtitle>
            <strong>Selected cities</strong>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
      <v-list
        nav
      >
        <v-list-item
          v-for="(station, index) in weatherStations"
          :key="index"
        >
          <v-list-item-content>
            <v-list-item-title>{{ station }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar 
      app
      color="primary"
       class="white--text"
    >
      <v-app-bar-nav-icon class="white--text" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Weather Dashboard</v-toolbar-title>
      <v-spacer />
      <v-btn class="white--text" @click="toggleTheme" text rounded>{{ themeTitle }}</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    components: {

    },
    computed: {
      ...mapState([ 'stations' ]),
    },
    data: () => ({ 
      drawer: false,
      themeTitle: 'Go Light',
      weatherStations: [],
    }),
    created() {
      this.getStations();
    },
    methods: {
      ...mapActions([ 'loadStations' ]),
      toggleTheme() {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

        if(this.$vuetify.theme.dark) {
          this.themeTitle = 'Go Light';
        } else {
          this.themeTitle = 'Go Dark';
        }

      },
      getStations: async function() {

        let url = `http://localhost:8081/api/get-stations`;
        
        let results = await this.$http.get(url);
        results = results.data;

        let stations = [];
        for(let i = 0; i < results.length; i++) {
          stations[i] = results[i].station;
        }

        this.weatherStations = stations;
        this.loadStations(stations);
        console.log('Stations: ', this.weatherStations);

      }

    }
  }
</script>
<style>
  
</style>
