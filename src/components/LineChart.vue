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
      'currentStations',
      'defaultDates'
    ]),
  },
  created() { 
    this.getStation();
    this.getStationData();
  },
  data() {
    return {
      chartData: [],
      chartOptions: {
        title: `${this.station} - ${this.metric}`, 
        curveType: 'function',
        height: 300,
        colors: [
          'red',
          'blue'
        ]
      },
      currentStation: null
    }
  },
  methods: {
    ...mapActions([ 
        'changeFirstLoadStatus', 
        'loadWeatherData',
        'changeFirstLoadStatus'
    ]),
    getStationData: async function() {

      var station = null;

      if(typeof this.station !== 'undefined') {
        station = this.station;
      } else {
        station = this.currentStation;
      }

      let url = `http://localhost:8081/api/get-daily/${this.start}/${this.end}/${station}`;
      //console.log('URL: ', url);

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

        if(this.metric === 'temperature') {
          chartData[i] = [data[i].date_time, data[i].high_temp, data[i].low_temp];
        }

        if(this.metric === 'humidity') {
          chartData[i] = [data[i].date_time, data[i].humidity_max, data[i].humidity_min];
        }

        if(this.metric === 'pressure') {
          chartData[i] = [data[i].date_time, data[i].pressure_max, data[i].pressure_min];
        }

      }
      
      chartData.unshift(['Date', 'High', 'Low']);
      //console.log('Chart Data', chartData);
      this.chartData = chartData;

    },
    getStation: async function() {

        let url = `http://localhost:8081/api/get-stations`;
        
        let results = await this.$http.get(url);
        results = results.data;
    
        let stations = [];

        for(let i = 0; i < results.length; i++) {
          stations[i] = results[i].station;
        }

        this.currentStation = stations[0];
        
      }
  }
}
</script>
<style>

</style>