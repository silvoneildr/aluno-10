angular.module('app.disciplinas.lista', [])
.controller('disciplinasCtrl', function($scope, $ionicPopover, $state, popupFactory, daoFactory) {
    
    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.turmas = daoFactory.getTurmas();

    $scope.addRecord = function() {
        $state.go('layout.cad_disciplinas');
    };

    popupFactory.startPopup('./app/views/popup_disciplinas.html', $scope);

    $scope.openPopup = function(event){
        $scope.popover.show(event);
    };   
});