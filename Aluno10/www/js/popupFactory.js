angular.module('app.popups', [])
.factory('popupFactory', function($ionicModal, $ionicPopover) {
    return {
        initModal: function(template, scope) {
            scope.$on('$ionicView.enter', function() {
                $ionicModal.fromTemplateUrl(template, {
                    scope: scope,
                    animation: 'slide-in-up',
                    backdropClickToClose: false,
                    hardwareBackButtonClose: false
                }).then(function(modal) {
                    scope.modal = modal;
                });
            });

            scope.$on('$ionicView.leave', function() {
                scope.modal.remove();
            });
        },
        
        startPopup: function(template, scope) {
            scope.$on('$ionicView.enter', function() {
                $ionicPopover.fromTemplateUrl(template, {
                    scope: scope
                }).then(function(popover) {
                    scope.popover = popover;
                });
            });
            
            scope.$on('$ionicView.leave', function() {
                scope.popover.remove();
            });
        }
    }
});