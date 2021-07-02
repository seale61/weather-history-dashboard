<template>
    <v-container>
      <GChart
        type="LineChart"
        :data="chartData"
        :options="chartOptions"
      />
    </v-container>
</template>
<script>
import { mapState, mapActions} from 'vuex';
export default {
  name: 'LineChart',
  props: {
    station:  String,
    metric:   String,
    start:    String,
    end:      String
  },
  components: {
    
  },
  computed: {
    ...mapState([ 
      'stations',
      'currentStation',
      'chartDates'
    ]),
  },
  created() { 
    this.$store.subscribe((mutation) => {
        if ((mutation.type === 'LOAD_CURRENT_STATION') || (mutation.type === 'SET_CHART_DATES')) {
          this.getStationData();
        }
    });
    console.log(this.currentStation, this.chartDates.start, this.chartDates.end);
    this.getStationData();
  },
  data() {
    return {
      chartData: [],
      chartOptions: {
        title: `${this.currentStation} - ${this.metric}`, 
        curveType: 'function',
        height: 300,
        colors: [
          'red',
          'blue'
        ]
      },
    }
  },
  methods: {
    ...mapActions([  
        'loadWeatherData',
    ]),
    getStationData: async function() {

      this.chartOptions.title = `${this.currentStation} - ${this.metric}`;
      let url = `http://localhost:8081/api/get-daily/${this.chartDates.start}/${this.chartDates.end}/${this.currentStation}`;
      console.log('URL: ', url);

      try {
        let results = await this.$http.get(url);
        this.processWeatherData(results.data);
      } catch(error) {
        //console.log(error);
      }

    },

    processWeatherData: function(data) {

      var chartData = [];

      for(let i = 0; i < data.length; i++) {

        if(this.metric === 'Temperature') {
          chartData[i] = [data[i].date_time, data[i].high_temp, data[i].low_temp];
        }

        if(this.metric === 'Humidity') {
          chartData[i] = [data[i].date_time, data[i].humidity_max, data[i].humidity_min];
        }

        if(this.metric === 'Pressure') {
          chartData[i] = [data[i].date_time, data[i].pressure_max, data[i].pressure_min];
        }

      }
      
      chartData.unshift(['Date', 'High', 'Low']);
      this.chartData = chartData;

    }
  }
}
</script>
<style>

</style>