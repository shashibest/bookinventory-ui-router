'use strict';

angular.module('USERSERVICE', [])
.service('USERSERVICE',USERSERVICE);
   USERSERVICE.$inject=[];
   function USERSERVICE(){ 

//.service('USERSERVICE', [function() {
     var setUser = function(user_data) {
        window.localStorage.userDetails = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.userDetails || '{}');
    };
    var dropUser = function(){
        window.localStorage.removeItem("userDetails");
        return true;
    };

    return {
        getUser: getUser,
        setUser: setUser,
        dropUser: dropUser
    };
	//}]);
	}
	