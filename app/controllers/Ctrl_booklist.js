'use strict';

angular.module('myApp.booklist', ['ui.router'])
/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/booklist', {    
    templateUrl: 'assets/pages/booklist.html',
    controller: 'booklistCtrl'
  });
}])
*/
.controller('booklistCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$http','$location', '$state', function($scope, $rootScope, MetaService, USERSERVICE, $http, $location, $state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("booklist | angular-seed","desc","blah blah");

    $rootScope.UserData = USERSERVICE.getUser();    
  	if($rootScope.UserData.userName == undefined){
  		//$location.path('/login');
		$state.go('login');
    }
	
     $scope.data = $rootScope.searchData;
	 
     
	 
}]);


              

