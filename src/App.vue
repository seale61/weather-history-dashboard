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
        </v-list-item-content>
      </v-list-item>

      <v-list nav>

        <v-list-item link to="/" @click="drawer=!drawer">
          <v-list-item-icon>
            <v-icon>mdi-chart-line</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/about" @click="drawer=!drawer">
          <v-list-item-icon>
            <v-icon>mdi-information-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider />

        <v-list-item @click="toggleTheme">
          <v-list-item-icon>
            <v-icon>{{ themeIcon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ themeTitle }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar 
      app
      color="primary"
      class="white--text"
    >
  
      <v-app-bar-nav-icon class="white--text d-xs-none d-xs-flex" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Weather Dashboard</v-toolbar-title>
      <v-spacer />

      <v-btn 
        icon 
        class="white--text d-none d-sm-flex"
        link to="/"
        title="Charts/Dashboard"
      >
        <v-icon>mdi-chart-line</v-icon>
      </v-btn>

      <v-btn 
        icon 
        class="white--text d-none d-sm-flex"
        link to="/about"
        title="About page"
      >
        <v-icon>mdi-information-variant</v-icon>
      </v-btn>
      <v-btn 
        icon 
        class="white--text d-none d-sm-flex" 
        @click="toggleTheme"
        :title="themeTitle"  
      >
        <v-icon>{{ themeIcon }}</v-icon>
      </v-btn>

      <!--v-btn class="white--text d-none d-sm-flex" @click="toggleTheme" text rounded>{{ themeTitle }}</v-btn-->
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
      themeIcon: 'mdi-weather-sunny',
      weatherStations: [],
      dates: {}
    }),
    created() {
      this.getStationList();
      this.getDefaultDates();
    },
    methods: {
      ...mapActions([ 
        'setChartDates',
        'loadCurrentStation',
        'loadStations'
      ]),
      toggleTheme() {

        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;

        if(this.$vuetify.theme.dark) {
          this.themeTitle = 'Light Theme';
          this.themeIcon = 'mdi-weather-sunny';
        } else {
          this.themeTitle = 'Dark Theme';
          this.themeIcon = 'mdi-moon-waning-crescent';
        }
        
      },
      getStationList: async function() {

        let url = `/app/get-stations`;
        
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
        
        this.setChartDates(dates);

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
  .v-btn {
    margin-right: 10px;
  }

</style>
