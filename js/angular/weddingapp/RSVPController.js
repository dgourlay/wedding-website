angular.module('WeddingApp', ['WeddingApp.services', 'ngDialog'])
  .controller('RSVPController', function ($scope, UserService, ngDialog, $window) {

    $scope.user = {
      attending: 'true',
      allergy: 'false',
      guest: {
        attending: 'false'
      }
    };

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
  })
  .controller('RSVPView', function ($scope, UserService) {
    $scope.responses = [];
    // $scope.responses.push({firstName: 'abc'});

    UserService.showAll().then(function (responses) {
      $scope.responses = responses;
      for (i = 0; i < responses.length; i++) {
        if ($scope.responses[i].attending === undefined) {
          $scope.responses[i].attending = true;
        }
        if ($scope.responses[i].guest.attending === undefined) {
          $scope.responses[i].guest.attending = true;
        }
      }
    });

  });