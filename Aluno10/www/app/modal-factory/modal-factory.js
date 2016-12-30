angular.module('app.modal-factory', [])
.factory('modalFactory', function($ionicModal) {
    return {
        showModal: function(template, scope) {
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
        }
    }
});