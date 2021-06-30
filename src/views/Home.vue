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
            <v-menu
              v-model="startDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date1"
                  label="Start Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date1"
                no-title
                @input="startDate = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <!--v-spacer /-->
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-menu
              v-model="endDate"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date2"
                  label="End Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date2"
                no-title
                @input="endDate = false"
              >
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            style="text-align: center"
          >
            <v-btn class="mt-4 ml-6 " @click="setNewDates" text rounded>Submit</v-btn>
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
            :start="defaultDates.start"
            :end="defaultDates.end"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

  import { mapState } from 'vuex';
  import LineChart from '../components/LineChart';

  export default {
    name: 'Home', 
    components: {
      LineChart,
    },
    computed: {
    ...mapState([ 
      'defaultDates',
      'stations',
    ]),
  },
  created() {
    this.date1 = this.defaultDates.start;
    this.date2 = this.defaultDates.end;
  },
  data: () => ({ 
      chartTypes: [
        'temperature',
        'humidity',
        'pressure',
      ],
      currentStation: 'Atlanta',
      date1: null,
      date2: null,
      startDate: false,
      endDate: false,
  }),
  methods: {
    setNewDates: function() {
      alert(`Start: ${this.date1}, End: ${this.date2}`);
    }
  }
}
</script>
<style lang="scss">
  .v-card {
    margin: auto;
    max-width: 600px !important;
  }
  .date-div {
    margin: auto;
    background-color: #FFFFFF;
    border-radius: 0 !important;
    padding: 5px;
  }
</style>