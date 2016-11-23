angular.module('app.my-select', [])
.directive('mySelect', function($ionicModal) {
    return {
        restrict : 'E',
        transclude: true,
        scope: {
            items: '=',
            value: '=',
            hasError: '=',
            onSelect: '='
        },
        templateUrl: 'app/my-select/my-select.tmpl.html',
        link: function(scope, element, attrs) {
            var name = attrs.name || 'selModal';
            
            scope.showItems = function(event) {
                event.preventDefault();
                
                $ionicModal.fromTemplateUrl(attrs.popupTmpl, {
                    scope: scope
                }).then(function(modal) {
                    var bars = modal.$el.find('ion-header-bar');
                    bars.addClass('bar-' + attrs.uiClass);
                    scope[name] = modal;
                    scope[name].show();
                });
            }

            scope.hideItems = function() {
                scope[name].hide().then(function() {
                    scope[name].remove();
                });
            }

            scope.selectValue = function(value) {
                if (scope.onSelect) {
                    scope.onSelect.call(scope.$parent, value);
                }                
                scope.value = value;
                scope.hideItems();
            }
        }
    };
});