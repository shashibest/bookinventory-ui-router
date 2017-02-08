'use strict';
const SERVERAPI = "https://fierce-hollows-55761.herokuapp.com/";
const TIMEOUT = 15000;
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'metaservice',
  'USERSERVICE',
  'ngMessages',
  'myApp.login',
  'myApp.signup',
  'myApp.forgatepwd',
  'myApp.Dashboard',
  'myApp.user-profile',
  'myApp.book-check',
  'myApp.search-book',
  'myApp.booklist',
  'myApp.selectbook',
  'myApp.success'
  //'myApp.view1',
  //'myApp.view2',
  //'myApp.party'
]).
config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function($locationProvider, $urlRouterProvider, $stateProvider) {
  //$locationProvider.hashPrefix('!');

  //$urlRouterProvider.otherwise('/otherwise');
  $stateProvider

  .state('login', {
    url: 'login',
    views: {
      'content': {
       templateUrl:'assets/login.html',
		controller: 'LoginCtrl'
      }
    }
  })
  .state('signup', {
    url: 'signup',
    views: {
      'content': {
        templateUrl:'assets/pages/signup.html',
		controller: 'signupCtrl'
      }
    }
  })  
  .state('forgatepwd', {
    url: 'forgatepwd',
    views: {
      'content': {
        templateUrl:'assets/pages/forgatepwd.html',
		controller: 'forgatepwdCtrl'
      }
    }
  })
  .state('myapp', {
    views: {
      'header': {
        templateUrl:'assets/pages/sidebar.html'		
      },
      'content': {
        template:'<div ui-view></div>'
      },
      'footer': {
        templateUrl:'assets/pages/footer/footer.html'
      }
    }
  })
  .state('myapp.user-profile', {
    url: 'user-profile',    
    templateUrl: 'assets/pages/user-profile.html',
	controller: 'userProfileCtrl'	
  })
  .state('myapp.book-check', {
    url: 'book-check', 	
	templateUrl: 'assets/pages/book-check.html',
    controller: 'book-checkCtrl'	
  })
  .state('myapp.search-book', {
    url: 'search-book',
	templateUrl: 'assets/pages/search-book.html',
    controller: 'search-bookCtrl'
  })
  .state('myapp.booklist', {
    url: 'booklist',
	templateUrl: 'assets/pages/booklist.html',
    controller: 'booklistCtrl'
  })
  /*
  .state('myapp.selectbook', {
    url: 'selectbook/:bookId',
	templateUrl: 'assets/pages/selectbook.html',
    controller: 'selectbookCtrl'
  })*/
  .state('myapp.success', {
    url: 'success',
	templateUrl: 'assets/pages/success.html',
    controller: 'successCtrl'
  })

 

}])
.run([ '$rootScope', '$location', '$anchorScroll','$state','USERSERVICE', function( $rootScope, $location, $anchorScroll, $state, USERSERVICE) {
  $rootScope.$on("$locationChangeSuccess", function(){
    $anchorScroll();
  });
  $state.go('login');
}])

.controller('MainCtrl', ['$scope','USERSERVICE','$location','$rootScope','$state', function($scope, USERSERVICE, $location, $rootScope, $state){
    $scope.logout = function(){
      USERSERVICE.dropUser();
      $rootScope.UserData = USERSERVICE.getUser();
      //$location.path('/login');
	  $state.go('login');
    }
}])
;
