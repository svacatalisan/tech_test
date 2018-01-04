const angular = require('angular');

angular.module('myApp').directive('addUser', function (UserService, $log) {
    return {
        restrict: 'EA',    
        require: 'ngModel',     
        scope: {
            usersList: '=ngModel'
        },
        replace: true,
        transclude: false,
        templateUrl: './addUserDirective.html',
        link: function (scope) {
            scope.createUser = function() {
                if (!scope.user.firstName || !scope.user.lastName) return;
                const payload = new FormData();
                payload.first_name = scope.user.firstName;
                payload.last_name = scope.user.lastName;
                payload.avatar = scope.user.avatar;

                UserService.createUser(angular.toJson(payload))
                    .then(handleCreateUserSuccess)
                    .catch(handleErrorResponse);
            }

            function handleCreateUserSuccess(response) {
                scope.user.firstName = undefined;
                scope.user.lastName = undefined;
                scope.user.avatar = undefined;
                scope.usersList.push(response.data);
                $log.log(response.data);
            }

            function handleErrorResponse(error) {
                $log.log(error);
            }
        }
    }
});