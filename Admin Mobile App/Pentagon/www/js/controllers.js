var MobileApp=angular.module('app.controllers', ["firebase"])

var shareUserName=null;
  
MobileApp.controller('launchKeyGeneratorCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See 
function ($scope, $stateParams) {
    console.log("Username:"+shareUserName);
    $scope.usernameData=shareUserName;
}])
   
MobileApp.controller('launchCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See 
function ($scope, $stateParams) {


}])
   
MobileApp.controller('loginCtrl', ['$scope','$state','$stateParams','$firebaseAuth', // The following is the constructor function for this page's controller. See 
function ($scope,$state,$stateParams,$firebaseAuth) {
    // Initialize Firebase
      var config = {
        apiKey: "AIzaSyD_Yz44zpyoDDOdFLet5fgOjbIphxvlUq0",
        authDomain: "hackathonumkc.firebaseapp.com",
        databaseURL: "https://hackathonumkc.firebaseio.com",
        storageBucket: "hackathonumkc.appspot.com",
        messagingSenderId: "67063658991"
      };
    firebase.initializeApp(config);
    var fbAuth = $firebaseAuth();
    
    //Login into application using Firebase Authencation
    $scope.login=function(username,password){       
        shareUserName=username;
        console.log("Username:"+shareUserName+" Password:"+password);
        fbAuth.$signInWithEmailAndPassword(username,password).then(function(authData) {
            $state.go("menu.launchKeyGenerator");
		}).catch(function(error) {
            alert("UnAuthencated User");
        });
    }
    
    
    /*$scope.register = function(username, password) {
        fbAuth.$createUserWithEmailAndPassword(username,password).then(function(userData) {
            return fbAuth.$signInWithEmailAndPassword(username,
                password);
        }).then(function(authData) {
            alert("Successful")
        }).catch(function(error) {
            console.error("ERROR: " + error);
        });
    }*/
}])
   
MobileApp.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See 
function ($scope, $stateParams) {


}])