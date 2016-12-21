angular.module('app.disciplinas', [])
.controller('disciplinasCtrl', function($scope, $ionicPopover, $state, $stateParams, popupFactory, daoFactory, msgFactory) {
    
    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.turmas = daoFactory.getTurmas();

    $scope.addRecord = function() {
        $state.go('layout.cad_disciplinas');
    };

    popupFactory.startPopup('./app/disciplinas/popup_disciplinas.html', $scope);

    $scope.openPopover = function(disciplina, event){
        $scope.disciplina = disciplina;
        $scope.popover.show(event);
    };
    
    $scope.editRecord = function(){
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
        console.log("Passou");
        $state.go('layout.frequencias',{disciplinaId: $scope.disciplina.id});
    };

    $scope.addAlunos = function(){
        $state.go('layout.alunos_disciplinas',{id: $scope.disciplina.id});
    };
});