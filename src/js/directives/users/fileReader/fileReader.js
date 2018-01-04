const angular = require('angular');

angular.module('myApp').directive('ngFileSelect', function () {
    return {
        restrict: 'EA',    
        require: 'ngModel',     
        scope: {
            avatar: '=ngModel'
        },
        replace: true,
        link: function (scope, element) {
          element.bind("change", function(){
            const reader = new FileReader();
            reader.onload = function(e) {
              scope.avatar = e.target.result;
              scope.$apply();
            }
            reader.readAsDataURL(element[0].files[0]);
          })
        }
    }
});