angular.module('WeddingApp.services', [])
  .factory('UserService', function ($q, $http, AWSService) {
    var service = {
      _user: null,
      UsersTable: "wedding-rsvp",

      putUser: function (user) {
        var d = $q.defer();
        AWSService.dynamo({
          params: {TableName: service.UsersTable}
        }).then(function (docClient) {

          var item = {};
          for (var property in user) {
            if (user.hasOwnProperty(property)) {
              item[property] = user[property];
            }
          }
          
          var itemParams = {
            Item: item
          };

          docClient.put(itemParams, function (err, data) {
            d.resolve(data);
          });

        });

        return d.promise;
      },
      getUser: function (userEmail) {
        var d = $q.defer();
        AWSService.dynamo({
          params: {TableName: service.UsersTable}
        }).then(function (docClient) {
          docClient.get({
              Key: {
                email: userEmail
              }
            },
            function (err, data) {
              if (err) {
                console.log(err);
              }

              if (Object.keys(data).length == 0) {
                // User didn't previously exist
                var user = {email: userEmail, createdTimestampUtc: new Date().getTime()};
                service._user = user;
                d.resolve(service._user);
              } else {
                service._user = data.Item;
                d.resolve(service._user);
              }
            });
        });

        return d.promise;
      }
    };
    return service;
  })
  .provider('AWSService', function () {
    var self = this;

    // Set defaults
    AWS.config.region = 'us-west-2';

    self.setCredentials = function (accessKeyId, secretAccessKey) {
      if (accessKeyId && secretAccessKey) {
        AWS.config.update({accessKeyId: accessKeyId, secretAccessKey: secretAccessKey});
      }
    };

    self.$get = function ($q, $http) {
      return {
        dynamo: function (params) {
          var d = $q.defer();

          $http.get('js/angular/weddingapp/credentials.json')
            .success((function (params) {
              return function (data) {
                AWS.config.update({accessKeyId: data.access_key, secretAccessKey: data.secret_access_key});
                d.resolve(new AWS.DynamoDB.DocumentClient(params));
              };
            })(params));

          return d.promise;
        }
      }
    }
  });