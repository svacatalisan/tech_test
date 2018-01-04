var angular = require('angular');

angular.module('myApp').factory('UserService', function (DAL) {
	var baseUrl = 'https://reqres.in';
	const returnObj = {};
  returnObj.getAllUsers = function(page) {
    return DAL.get(baseUrl + '/api/users?page=' + page);
  };

  returnObj.getUserById = function(id) {
    return DAL.get(baseUrl + '/api/users/' + id);
  };

  returnObj.createUser = function(userData) {
    return DAL.post(baseUrl + '/api/users', userData);
  };

  returnObj.deleteUserById = function(id) {
    return DAL.delete(baseUrl + '/api/users/' + id);
  };

  returnObj.updateUserById = function(id, userData) {
    return DAL.put(baseUrl + '/api/users/' + id, userData);
  };

  return returnObj;
});