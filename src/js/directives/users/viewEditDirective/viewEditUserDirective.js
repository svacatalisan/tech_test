const angular = require('angular');

angular.module('myApp').directive('viewEditUser', function (UserService, $log) {
    return {
        restrict: 'EA',    
        require: 'ngModel',     
        scope: {
            user: '=ngModel'
        },
        replace: true,
        transclude: false,
        templateUrl: './viewEditUserDirective.html',
        link: function (scope, element) {
            scope.editMode = false;
            scope.localUser = Object.assign({}, scope.user);

            scope.isEditModeOn = function() {
                return scope.editMode;
            }

            scope.toggleEditMode = function() {
                if (!scope.editMode) {
                    scope.localUser = Object.assign({}, scope.user);                    
                }
                scope.editMode = !scope.editMode;
            }

            scope.updateUser = function() {
                $log.log(scope.localUser)
                UserService.updateUserById(scope.localUser.id, angular.toJson(scope.localUser))
                    .then(handleUpdateUserSuccess)
                    .catch(handleErrorResponse);
            }

            scope.deleteUser = function() {
                $log.log(scope.localUser)
                UserService.deleteUserById(scope.localUser.id)
                    .then(handleDeleteUserSuccess)
                    .catch(handleErrorResponse);
            }

            function handleUpdateUserSuccess(response) {
                $log.log(response.data);
                scope.toggleEditMode();
                scope.user = Object.assign({}, scope.localUser);
            }

            function handleDeleteUserSuccess(response) {
                $log.log(response);
                scope.user = undefined;
                element.remove();
                scope.$destroy();
            }

            function handleErrorResponse(error) {
                $log.log(error);
            }
        }
    }
});