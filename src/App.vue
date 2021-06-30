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
          <v-list-item-subtitle class="subtitle">
            <strong>Selected cities</strong>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
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

      <v-divider class="link-item d-lg-none d-xl-flex" />
      <v-list>
        <v-list-item>
          <div class="link-item d-lg-none d-xl-flex" @click="toggleTheme">{{ themeTitle }}</div>
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
      <v-btn class="white--text d-none d-sm-flex" @click="toggleTheme" text rounded>{{ themeTitle }}</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    data: () => ({ 
      drawer: false,
      themeTitle: 'Light Theme',
      weatherStations: [],
      dates: {}
    }),
    created() {
      this.getStationList();
      this.getDefaultDates();
    },
    methods: {
      ...mapActions([ 
        'setDefaultDates',
        'loadCurrentStation',
        'loadStations'
      ]),
      toggleTheme() {
        
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

        if(this.$vuetify.theme.dark) {
          this.themeTitle = 'Light Theme';
        } else {
          this.themeTitle = 'Dark Theme';
        }
        
      },
      getStationList: async function() {

        let url = `http://localhost:8081/api/get-stations`;
        
        let results = await this.$http.get(url);
        results = results.data;
    
        let stations = [];

        for(let i = 0; i < results.length; i++) {
          stations[i] = results[i].station;
        }

        this.weatherStations = stations;
        this.loadStations(stations);
        this.loadCurrentStation(stations[0]);

      },
      getDefaultDates: function() {

        let start = new Date()
        start.setDate(start.getDate() - 14);

        let end = new Date();
        end.setDate(end.getDate());

        let startMonth  = start.getMonth() + 1;
        let startDay    = start.getDate();

        let endMonth  = end.getMonth() + 1;
        let endDay    = end.getDate();


        if(startMonth < 10) {
          startMonth = '0' + startMonth;
        }

        if(startDay < 10) {
          startDay = '0' + startDay;
        }

        if(startMonth < 10) {
          endMonth = '0' + endMonth;
        }

        if(endDay < 10) {
          endDay = '0' + endDay;
        }
        
        let dates = {
          start:  `${start.getFullYear()}-${startMonth}-${startDay}`,
          end:    `${end.getFullYear()}-${endMonth}-${endDay}`
        }
        
        this.setDefaultDates(dates);

      }
    }
  }
</script>
<style>
  .subtitle {
    font-size: 1.1rem;
  }
  .link-item {
    cursor: pointer;
  }
</style>
