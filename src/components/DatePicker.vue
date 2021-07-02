<template>
    <v-menu
        v-model="dateItem"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="dateValue"
                :label="dateLabel"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-model="dateValue"
            no-title
            @input="setDate"
        >
        </v-date-picker>
    </v-menu>
</template>
<script>

import { mapState, mapActions } from 'vuex';
export default {
    name: 'DatePicker',
    props: {
        date: String,
        dateLabel: String
    },
    computed: {
        ...mapState([ 
            'chartDates'
        ]),
    },
    data() {
        return {
            dateItem:   false,
            dateValue:  this.date
        }
    },
    methods: {
        ...mapActions([
            'setChartDates'
        ]),
        setDate: function() {

            this.dateItem = false;
            let dates = null;

            if (this.dateLabel === 'Start Date') {
  
                dates = {
                    start: this.dateValue,
                    end: this.chartDates.end
                } 
            } 
            
            if (this.dateLabel === 'End Date') {

                dates = {
                    start: this.chartDates.start,
                    end: this.dateValue
                } 
            }

            this.setChartDates(dates);

        }
    }
}
</script>
