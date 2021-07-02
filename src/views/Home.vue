<template>
  <v-container class="mt-2">
    <v-row>
      <v-col cols="12">
        <v-card class="pa-3" color="secondary">
          <v-row>
          <!-- Date section -->
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <DatePicker :date="date1" :dateLabel="startLabel" />
          </v-col>
          <!--v-spacer /-->
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <DatePicker :date="date2" :dateLabel="endLabel" />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            style="text-align: center"
          >
            <StationMenu class="mt-4 ml-6" title="Select a station location" />
          </v-col>
          <!-- End date section -->  
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="(chart, index) in chartTypes"
        :key="index"
        cols="12"
      >
        <v-card height="325" color="secondary" >
          <LineChart 
            :station="currentStation"
            :metric="chart"
            :start="chartDates.start"
            :end="chartDates.end"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import { mapState, mapActions } from 'vuex';
  import LineChart from '../components/LineChart';
  import StationMenu from '../components/StationMenu.vue';
  import DatePicker from '../components/DatePicker.vue';

  export default {
    name: 'Home', 
    components: {
      LineChart,
      StationMenu,
      DatePicker
    },
    computed: {
    ...mapState([ 
      'chartDates',
      'stations',
      'currentStation'
    ]),
  },
  created() {
    this.date1 = this.chartDates.start;
    this.date2 = this.chartDates.end;
  },
  data: () => ({ 
      chartTypes: [
        'Temperature',
        'Humidity',
        'Pressure',
      ],
      date1: null,
      date2: null,
      startLabel: 'Start Date',
      endLabel: 'End Date'
  }),
  methods: {
    ...mapActions([
      'setChartDates'
    ]),
    setNewDates: function() {
      let dates = {
        start: this.date1,
        end:  this.date2
      }
      this.setChartDates(dates);
    }
  }
}
</script>
<style lang="scss">
  .v-card {
    margin: auto;
    max-width: 600px !important;
  }
</style>