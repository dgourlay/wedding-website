angular.module('WeddingApp', ['WeddingApp.services', 'ngDialog'])
  .controller('RSVPController', function ($scope, UserService, ngDialog, $window) {

    $scope.user = {
      attending: 'true',
      allergy: 'false',
      guest: {
        attending: 'false'
      }};

    $scope.$watch('user.email', function (newValue, oldValue) {
      if ($scope.rsvpform.email.$valid && $scope.rsvpform.email.$dirty) {
        UserService.getUser($scope.user.email).then(function (resp) {
          $scope.user = resp;
          console.log(JSON.stringify($scope.user))
        });
      }
    });

    $scope.submit = function (user) {
      UserService.putUser(user).then(function (resp) {
        console.log("Saved user: " + resp);
        var dialog = ngDialog.open(
          {
            template: 'rsvpConfirm.html',
            className: 'ngdialog-theme-flat'
          }
        );

        dialog.closePromise.then(function (data) {
          $window.location.assign('/');
        });

      });
    }
  });