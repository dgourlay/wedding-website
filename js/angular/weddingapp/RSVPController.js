angular.module('WeddingApp', [])
  .controller('RSVPController', function ($scope) {

    $scope.guestAttending = false;
    $scope.groupAccommodation = true;

    $scope.changeGuestAttending = function (value) {
      if (value === 'true') {
        $scope.guestAttending = true;
      } else {
        $scope.guestAttending = false;
      }
    }

    $scope.changeGroupAccommodation = function (value) {
      if (value === 'true') {
        $scope.groupAccommodation = true;
      } else {
        $scope.groupAccommodation = false;
      }
    }
  });