<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          {{ currentStation }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(station, index) in stations"
          :key="index"
          @click="loadCurrentStation(station)"
        >
          {{ station }}
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex';
    export default {
        name: 'StationMenu',
        computed: {
            ...mapState([ 
                'stations',
                'currentStation'
            ]),
        },
        methods: {
            ...mapActions([
                'loadCurrentStation'
            ])
        }
    }
</script>