var MobileApp=angular.module('app.controllers', ["firebase"])

var shareUserName=null;
  
MobileApp.controller('launchKeyGeneratorCtrl', ['$scope', '$stateParams','$http',
function ($scope, $stateParams,$http) {
    /*console.log("Username:"+shareUserName);*/
    $scope.usernameData=shareUserName;
    $scope.calculateKeyAndSend=function () {
        var numOfUsers = 5;
		var threshold = 3;
		var key=13;
		var mod=17;
		var a=[];
		
		a=coeffArr(threshold);
		function coeffArr(threshold)
		{
		  var arr=[];
		  var i;
			for (i = 0; i < threshold-1; i++) {
				arr[i]=Math.trunc((Math.random())*threshold);
			}
		  return arr;
		}
		
		function poly(x,threshold,key,a)
		 {
		  var sum=key;
		  var j=0;
		  for(var i=threshold-1;i>0;i--)
		  {
		   sum=sum+((a[j])*(Math.trunc(Math.pow(x, i))));
		   j=j+1;
		  }
		  return sum%mod;
		 }
		 
		function keygen(numOfUsers)
		{
		  var i;
		  var h=[];
		  for(i=0;i<=numOfUsers;i++)
		  {
			h[i]=poly(i,threshold,key,a);
		  }
		   return h;
		}
		var h=[];
		h=keygen(numOfUsers);

        //constructing individual json and pushing to mongoLab
        
        function sendJson(numOfUsers)
		{
		  var i;
          var mongoLab;
		  var jsonKey=[];
		  for(i=1;i<=numOfUsers;i++){
              
            jsonKey[i]="{\"ClientUID\":"+i+",\"key\":"+h[i]+"}";
            /*console.log(jsonKey[i]);*/
              
            //pushing to mongoLab
            mongoLab="https://api.mlab.com/api/1/databases/hackathon/collections/user"+i+"?apiKey=DVaTBkDjynm4xhj1vJ1HXniGoKIUEmik";
            console.log(mongoLab); 
              $http({
                method: 'POST',
                url: mongoLab,
                data:jsonKey[i]
            }).then(function successCallback(response) {
                console.log("Inserted key for User");
            }, function errorCallback(response) {
                console.log("Unable to insert key for User");
            });
          }            
		}
        sendJson(numOfUsers); 
                    
    }
}])
   
MobileApp.controller('launchCtrl', ['$scope', '$stateParams',
function ($scope, $stateParams) {


}])
   
MobileApp.controller('loginCtrl', ['$scope','$state','$stateParams','$firebaseAuth', 
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
        /*console.log("Username:"+shareUserName+" Password:"+password);*/
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