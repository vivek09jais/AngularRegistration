myApp.factory('Authentication', ['$rootScope', '$location','$firebaseObject','$firebaseAuth',
 function($rootScope, $location, $firebaseObject,$firebaseAuth){

 	var ref = firebase.database().ref(); //Rrference to a database.
 	var auth = $firebaseAuth(); // var for authentication perpose.
    var myObject;  
        auth.$onAuthStateChanged(function(authUser){
        	if(authUser){
        		var userRef = ref.child('user').child(authUser.uid);
        		var userObj = $firebaseObject(userRef);
        		$rootScope.currentUser = userObj;
        	} else{
        		$rootScope.currentUser = '';
        	}
        });

    myObject = {
	   login: function(user){
	   	auth.$signInWithEmailAndPassword(
	   		user.email,
	   		user.password
	   		).then(function(user){
	   			$location.path('/success');
	   		}).catch(function(error){
	   			$rootScope.message = error.message;
	   		});
    }, //login

    logout: function(){
    	return auth.$signOut();
    }, // logout

    requireAuth: function(){
    	return auth.$requireSignIn();
    }, // Authentication require.

    register: function(user){
    	auth.$createUserWithEmailAndPassword(
     		user.email,
     		user.password
     		).then(function(regUser){
     			var regRef = ref.child('user')
     			   .child(regUser.uid).set({
					date: firebase.database.ServerValue.TIMESTAMP,
					regUser: regUser.uid,
					firstname: user.firstname,
					lastname: user.lastname,
					email: user.email
     			   }); // user information.
     			myObject.login(user);
     		}).catch(function(error){  //catch methode given by firebase to handle error.
     			$rootScope.message = error.message;
     		}); 
    } //register
	}; //return

	return myObject;
}]); //factory