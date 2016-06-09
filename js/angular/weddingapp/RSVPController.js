angular.module('WeddingApp', ['WeddingApp.services'])
  .controller('RSVPController', function ($scope, UserService) {

    $scope.user = {};
    $scope.$watch('user.email', function (newValue, oldValue) {
      if ($scope.rsvpform.email.$valid && $scope.rsvpform.email.$dirty) {
        UserService.getUser($scope.user.email).then(function (resp) {
          $scope.user = resp;
          console.log(JSON.stringify($scope.user))
        });
      }
    });

    $scope.guestAttending = 'false';
    $scope.groupAccommodation = 'true';

    $scope.submit = function (user) {
      UserService.putUser(user).then(function (resp) {
        console.log("Saved user: " + resp);
      });
    }
  });