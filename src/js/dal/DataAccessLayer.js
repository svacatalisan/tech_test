var angular = require('angular');

angular.module('myApp').factory('DAL', function ($http, $log) {
    const returnObj = {};
    returnObj.get = function(url) {
      return $http.get(url)
        .then(handleSuccessResponse)
        .catch(handleErrorResponse);
    };

    returnObj.post = function(url, payload) {
      return $http.post(url, payload)
        .then(handleSuccessResponse)
        .catch(handleErrorResponse)
    }

    returnObj.put = function(url, payload) {
      return $http.post(url, payload)
        .then(handleSuccessResponse)
        .catch(handleErrorResponse)
    }

    returnObj.delete = function(url) {
      return $http.delete(url)
        .then(handleSuccessResponse)
        .catch(handleErrorResponse)
    }

    function handleSuccessResponse(response) {
      $log.log('Request was successfully performed');
      return response;
    }
  
    function handleErrorResponse(error) {
      $log.log('Something went wrong');
      return error;
    }

    return returnObj;
});