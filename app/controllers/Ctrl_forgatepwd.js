'use strict';

angular.module('myApp.forgatepwd', ['ui.router'])
/*
.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('forgatepwd', {
    url: 'myapp.forgatepwd',
    templateUrl: 'assets/pages/forgatepwd.html',
    controller: 'forgatepwdCtrl'
  });
}])*/

.controller('forgatepwdCtrl', ['$scope','$rootScope', 'MetaService','$http', function($scope, $rootScope, MetaService, $http) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Forgetpassword | angular-seed","desc","Forgetpassword");

$scope.userData = {};

	   $scope.forgatepwd = function(info){
	   	console.log(info);
		  	$scope.loading = true;
		   	$http.defaults.headers.post["Content-Type"] = "application/json";
		    var startTime = new Date().getTime();
		    $http.post(SERVERAPI + 'api/forgotpwd', info, {timeout : TIMEOUT}).then( 
		    function(result) {
		    	console.log(result);
		        if (result.data.status) {
					$scope.loading = false;
					alert('password send successfully.');
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