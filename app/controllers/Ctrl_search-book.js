'use strict';

angular.module('myApp.search-book', ['ui.router'])
/*
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search-book', {
    templateUrl: 'assets/pages/search-book.html',
    controller: 'search-bookCtrl'
  });
}])
*/
.controller('search-bookCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$http','$location','$state', function($scope, $rootScope, MetaService, USERSERVICE, $http, $location,$state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("search book | angular-seed","desc","blah blah");
	
	$rootScope.UserData = USERSERVICE.getUser();
    //console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){
  		//$location.path('/login');
		$state.go('login');
    }
	$rootScope.searchData = {};
  	$scope.searchData = { ISBN: '', title: ''};
    $scope.disableTitle = false;
    $scope.disableISBN = false;
 
      $scope.searchByProp = function(attr, prop){
	    if(attr == 'ISBN'){
	      var startTime = new Date().getTime();
	          $http.get(SERVERAPI+ 'api/searchbook?ISBN='+prop, {timeout : TIMEOUT}).then( 
	          function(result) {
	            if (result.data.status && result.data.data.length > 0) {
	            	$rootScope.searchData = result.data.data;
					console.log(result.data.data);
              		//$location.path('booklist');
					$state.go('myapp.booklist');
                } else {
                	alert('No Books Found');
                }
	          },function(error) {
	              var respTime = new Date().getTime() - startTime;
	              if(respTime >= TIMEOUT){
	                  alert('Server is busy, please try again.');
	              }else{
	                alert('Title, publisher details not found on this ISBN number.');
	              }
	          }); 
	              
	   }else{
	          var startTime = new Date().getTime();
	          $http.get(SERVERAPI+ 'api/searchbook?title='+prop, {timeout : TIMEOUT}).then( 
	          function(result) {
	            if (result.data.status && result.data.data.length > 0) {
	             
               	 $rootScope.searchData = result.data.data;
              		//$location.path('booklist');
					$state.go('myapp.booklist');
                } else {
                  alert('No Books Found');
                }
	          },function(error) {
	             
	              var respTime = new Date().getTime() - startTime;
	              if(respTime >= TIMEOUT){
	                  alert('Server is busy, please try again.');
	              }else{
	                alert('Title, publisher details not found on this ISBN number.');
	              }
	          });
	   }
	};

 $scope.disableButton = function(data){
   if(($scope.searchData.ISBN == '' || $scope.searchData.ISBN == ' ' ) && ($scope.searchData.title == '' || $scope.searchData.title == ' ')){
    //console.log(1);
    $scope.disableTitle = false;
    $scope.disableISBN = false;

  }else if(($scope.searchData.ISBN !== '' || $scope.searchData.ISBN !== ' ') && ($scope.searchData.title == '' || $scope.searchData.title == ' ')){
    //console.log(2);
    $scope.disableTitle = true;
    $scope.disableISBN = false;
    $scope.searchbyISBN = true;
  }else{
    //console.log(3);
    $scope.disableTitle = false;
    $scope.disableISBN = true;
    $scope.searchbyISBN = false;
  }
 }
$scope.disableButton2 = function(data){
  if($scope.searchData.ISBN == '' && $scope.searchData.title == ''){
    //console.log(1);
    $scope.disableTitle = false;
    $scope.disableISBN = false;
  }else if($scope.searchData.ISBN !== '' && $scope.searchData.title == ''){
    //console.log(2);
    $scope.disableTitle = true;
    $scope.disableISBN = false;
    $scope.searchbyISBN = true;
  }else{
    //console.log(3);
    $scope.disableTitle = false;
    $scope.disableISBN = true;
    $scope.searchbyISBN = false;
  }
};
}]);