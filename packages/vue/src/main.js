import * as Vue from 'vue';
import App from './App.vue';
import './../../../css/styles.css';

const vm = Vue.createApp(App);
vm.config.performance = true;
vm.mount('#main');
