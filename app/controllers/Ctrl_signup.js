'use strict';

angular.module('myApp.signup', ['ui.router'])
/*
.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('myapp.signup', {
    url: 'signup',  
    templateUrl: 'assets/pages/signup.html',
    controller: 'signupCtrl'
  });
}])*/

.controller('signupCtrl', ['$scope','$rootScope', 'MetaService','$http','$location','$state', function($scope, $rootScope, MetaService, $http, $location,$state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Signup | angular-seed","registerUser"," Signup registration");

   $scope.userData = {};

	   $scope.signupUser = function(info){
	   	console.log(info);
		  	$scope.loading = true;
		   	//$http.defaults.headers.post["Content-Type"] = "application/json";
		    var startTime = new Date().getTime();
		    $http.post(SERVERAPI + 'api/registration', info, {timeout : TIMEOUT}).then( 
		    function(result) {
		    	console.log(result);
		        if (result.data.status) {
					$scope.loading = false;
					alert('You are registered successfully.');
					//$location.path('/login');
					$state.go('login');
		        } else {
			        $scope.loading = false;
			        alert(result.data.message);
		        } 
		    },function(error) {
		        $scope.loading = false;
		        var respTime = new Date().getTime() - startTime;
		        if(respTime >= TIMEOUT){
		            alert('Server is busy, please try again.');
		        }else{
		          alert('Something went wrong, Please contact administrator.');
		        }
		    });
		    
	   }
}]);