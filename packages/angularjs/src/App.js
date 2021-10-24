import angular from 'angular';
import controller from './home.controller';
import template from './home.template.html';
import './../../../css/styles.css';
import { performanceAPI, SaveToJSON } from '../../../utils';

window.addEventListener('load', () => {
  const performance = performanceAPI();
  new SaveToJSON(performance, 'react.json').download();
});

angular
  .module('app', [])
  .config([
    '$compileProvider',
    function ($compileProvider) {
      $compileProvider.debugInfoEnabled(false);
    }
  ])
  .run(() => {
    console.info(angular.version.full);
  })
  .component('home', {
    controller,
    template
  });

angular.element(document).ready(() => {
  angular.bootstrap(document.body, ['app'], { strictDi: true });
});
