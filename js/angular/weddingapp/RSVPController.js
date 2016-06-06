angular.module('WeddingApp', ['WeddingApp.services'])
  .controller('RSVPController', function ($scope, UserService) {

    $scope.user = {};
    $scope.$watch('user.email', function (newValue, oldValue) {
      if ($scope.rsvpform.email.$valid && $scope.rsvpform.email.$dirty) {
        UserService.getUser($scope.user.email).then(function (resp) {
          $scope.user.firstName = resp.firstName;
          $scope.user.lastName = resp.lastName;
          console.log($scope.user)
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