angular.module('app.cadform', [])
.directive('cadform', function() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: {
            isTab: '=',
            save: '&',
            close: '&',
            title: '@'
        },
        templateUrl: './app/cadform/cadform.tmpl.html',
        link: function(scope, element, attrs, ctrl) {
            scope.$parent.cadform = scope.cadform;
        }
    }
});