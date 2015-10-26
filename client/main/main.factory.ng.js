'use strict'

angular.module('calApp')
.factory('MathHttpService', ['$http', '$q', function($http, $q){
  return {
    getInfo: function(operation, values) {
      // the $http API is based on the deferred/promise APIs exposed by the $q service
      // so it returns a promise for us by default
      return $http.get('http://api.mathjs.org/v1/?expr=2*(7-3)')
          .then(function(response) {
            if (typeof response.data === 'object') {
              return response.data;
            } else {
              // invalid response
              return $q.reject(response.data);
            }

          }, function(response) {
            // something went wrong
            return $q.reject(response.data);
          });
    }
  };
}]);