'use strict';

angular.module('myApp.selectbook', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
	$stateProvider
   .state('myapp.selectbook', {
    url: 'selectbook/:bookId',
    templateUrl: 'assets/pages/selectbook.html',
    controller: "selectbookCtrl"
  })
}])
.controller('selectbookCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$location', '$http', '$stateParams', '$state', function($scope, $rootScope, MetaService, USERSERVICE, $location, $http, $stateParams, $state) {
	// Configure Meta Tags and Title	
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("book Details| angular-seed","desc","blah blah");	
	/*----------------------------------------------*/ 
	$rootScope.UserData = USERSERVICE.getUser();   
  	if($rootScope.UserData.userName == undefined){
  		//$location.path('/login');
		$state.go('login');
    }
	/*----------------------------------------------*/ 
	var bid=$stateParams.bookId;	
	var booklist = $rootScope.searchData;
	for (var i in booklist) {
			if (booklist[i]._id == bid) {
			$rootScope.list = booklist[i]; 
			}
		}    
	$scope.data1 = [$rootScope.list];  
	 /*----------------------------------------------*/         
	 $scope.sellBook1 = function(item){
		
        var userData = USERSERVICE.getUser();
        item.userId = userData._id;
      
       console.log(item);
      var startTime = new Date().getTime();
      $http.post(SERVERAPI + 'api/sellbook', item, {timeout : TIMEOUT}).then( 
        function(result) {
            if (result.data.status == true) {                  
                  //alert("success fully sell");
				  console.log(result.data.status);
              		//$location.path('success');
					$state.go('myapp.success');
            } else {              
              alert(result.data.message);
            }
        },function(error) {            
            var respTime = new Date().getTime() - startTime;
              if(respTime >= TIMEOUT){
                alert('Server is busy, please try again.');
              }else{
                alert('Something went wrong, Please contact administrator.');
              }
         });
       };
	  
	  
	  
}]);