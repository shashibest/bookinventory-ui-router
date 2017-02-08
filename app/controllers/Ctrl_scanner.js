'use strict';

angular.module('myApp.scanner', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/scanner', {
    templateUrl: 'assets/pages/scanner.html',
    controller: 'scannerCtrl'
  });
}])

.controller('scannerCtrl', [function() {

}]);