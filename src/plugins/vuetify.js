import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi'
    },
    theme: {
        dark: true,
        themes: {
            light: {

                primary: '#3f51b5',
                secondary: '#FAFAFA',
                accent: '#03a9f4',
                error: '#f44336',
                warning: '#ff9800',
                info: '#2196f3',
                success: '#4caf50'

            },
            dark: {
                primary: '#34495E',
                secondary: '#294754'
            }
        }
    },
});
