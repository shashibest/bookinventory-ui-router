'use strict';

angular.module('myApp.login', ['ui.router'])
/*
.config(['$stateProvider', function($stateProvider) {
	$stateProvider
   .state('myapp.login', {
    url: 'login',
    templateUrl: 'assets/login.html',
    controller: "LoginCtrl"
  })
}])*/
.controller('LoginCtrl', ['$scope','$rootScope', 'MetaService','$http','USERSERVICE','$location','$state', function($scope, $rootScope, MetaService, $http,USERSERVICE,$location,$state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("UserLogin | angular-seed","register user login here desc"," login UserLogin ");
	
	
	$rootScope.UserData = USERSERVICE.getUser();
   // console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName){
  		//$location.path('/Dashboard');
		$state.go('myapp.Dashboard');
  	};
	
       $scope.userData = {};
 	   $scope.loginUser = function(info){
	   	    //console.log(info);
		  	$scope.loading = true;
		   	//$http.defaults.headers.post["Content-Type"] = "application/json";
		    var startTime = new Date().getTime();
		    $http.post(SERVERAPI + 'api/login', info, {timeout : TIMEOUT}).then( 
		    function(result) {
		    	//console.log(result);
		        if (result.data.status) {
					$scope.loading = false;
					//alert('Login successfully.');
					USERSERVICE.setUser(result.data.data);
					//$location.path('/Dashboard');
					$state.go('myapp.Dashboard');
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
		    
	   };
	
	   
}]);