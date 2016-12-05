angular.module('app.disciplinas.lista', [])
.controller('disciplinasCtrl', function($scope, $ionicPopover, $state, popupFactory, daoFactory, msgFactory) {
    
    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.turmas = daoFactory.getTurmas();

    $scope.addRecord = function() {
        $state.go('layout.cad_disciplinas');
    };

    popupFactory.startPopup('./app/views/popup_disciplinas.html', $scope);

    $scope.openPopover = function(disciplina, event){
        $scope.disciplina = disciplina;
        $scope.popover.show(event);
    };

    $scope.editRecord = function(){
        // console.log($scope.turmas.getById($scope.disciplina.turmaId).nome);
        console.log($scope.disciplinas.getById($scope.disciplina.id));
        $state.go('layout.cad_disciplinas',{id: $scope.disciplina.id});
        $scope.popover.hide();
    };

    $scope.deleteRecord = function(){
        msgFactory.confirm('Deseja excluir a disciplina?').then(function(res) {
            if (!res) return;
            $scope.disciplinas.delete($scope.disciplina);
            $scope.disciplinas.post();
        });
        $scope.popover.hide();
    };

    $scope.addFrequencia = function(){
        $state.go('layout.frequencias');
    };
});