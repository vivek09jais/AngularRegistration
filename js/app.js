var myApp = angular.module('myApp',['ngRoute','firebase']);

  myApp.run(['$rootScope','$location', function($rootScope,$location,){
     $rootScope.$on('$routeChangeError', function(event,next,previous,error){ //this function will return the information about events...
        if(error == 'AUTH_REQUIRED'){
            $rootScope.message = "Please log to access the page";
            $location.path('/login');
        }
     });
  }]); // run

myApp.config(['$routeProvider',function($routeProvider) {
  $routeProvider.
    when('/login',{
    	templateUrl:'views/login.html',
    	controller: 'RegistrationController'
    }).
     when('/register',{
     	templateUrl:'views/register.html',
    	controller: 'RegistrationController'
    }).
     when('/success',{
     	templateUrl:'views/success.html',
    	controller: 'successController',
        resolve: {
            currentAuth: function(Authentication){
                return Authentication.requireAuth();
            }
        }
    }).
     otherwise({
     	redirectTo: '/login'
     });
}]);