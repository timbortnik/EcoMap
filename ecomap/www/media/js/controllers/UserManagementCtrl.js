app.controller('UserManagementCtrl', ['$scope',  '$cookies', '$http', '$location', function($scope, $cookies, $http, $location){

  $scope.showLoginModal = false;
  $scope.toggleLoginModal = function(){
    $scope.showLoginModal = !$scope.showLoginModal;
  };

  $scope.showRegisterModal = false;
  $scope.toggleRegisterModal = function(){
    $scope.showRegisterModal = !$scope.showRegisterModal;
  };  

  $scope.checkLogined = function(){
    if($cookies.get('name') && $cookies.get('surname')){
      return $cookies.get('name') + " " + $cookies.get('surname');
    } else{
      return null;
    }
  }

  $scope.newUser = {};
  $scope.Register = function(){
    if(!$scope.newUser.email || !$scope.newUser.firstName ||
      !$scope.newUser.lastName || !$scope.newUser.password ||
      !$scope.newUser.pass_confirm){
      return null;
    }
    if($scope.newUser.password == $scope.newUser.pass_confirm){
      $http({
        method: 'POST',
        url: '/api/register',
        data: $scope.newUser
      }).then(function successCallback(responce){
        $scope.showRegisterModal = false;
        console.log(responce.data);
        $scope.user.email = $scope.newUser.email;
        $scope.user.password = $scope.newUser.password;
        $scope.Login();
        $scope.newUser = {};
      },
        function errorCallback(responce){});
    }
  };

  $scope.invalidPasswordEmail = false;
  $scope.getInvalidPasswordEmail = function(){
    return $scope.invalidPasswordEmail;
  };
  $scope.changeInvalidPasswordEmail = function(){
    $scope.invalidPasswordEmail = false;
  };

  $scope.user = {};
  $scope.Login = function(){
    if(!$scope.user.email || !$scope.user.password){
      return null;
    }
    $http({
      method: 'POST',
      url: '/api/login',
      data: $scope.user
    }).then(function successCallback(responce){
      $scope.showLoginModal = false;
      $cookies.put('name', responce.data.name);
      $cookies.put('surname', responce.data.surname);
      $cookies.put('id', responce.data.id);
      $scope.user = {};      
    },
      function errorCallback(responce){
        if(responce.status == 401){
          $scope.invalidPasswordEmail = true;
        } 
      });
  };

  $scope.Logout = function(){
    $http({
      method: 'POST',
      url: '/api/logout',
      data: $scope.user
    }).then(function successCallback(responce){
      $cookies.remove('name');
      $cookies.remove('surname');
      $cookies.remove('id');
      $location.url('/map');
      $scope.newUser = {};
      $scope.user = {};
      // angular.element(document.querySelector('#loginForm')).$setPristine();
      // angular.element(document.querySelector('#registerForm')).$setPristine();
    },
      function errorCallback(data){});
  };

}]);
