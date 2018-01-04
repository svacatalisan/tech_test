const angular = require('angular');

angular.module('myApp')
    .controller('UsersController', function(UserService, $log) {
    const vm = this;
    
    vm.$onInit = function() {
        vm.usersList = [];
		getAllUsers();
    }

    function getAllUsers() {
        UserService.getAllUsers(1)
            .then(handleGetUsersSuccess)
            .catch(handleErrorResponse);
    }

    function handleGetUsersSuccess(response) {
        vm.usersList = response.data.data;
        $log.log(response.data);
    }

    function handleErrorResponse(error) {
        $log.log(error);
    }
});