angular.module('app.cad_disciplinas', [])
.controller('cad_disciplinasCtrl', function($scope, $state, daoFactory, msgFactory){

    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.turmas = daoFactory.getTurmas();

    $scope.saveRecord = function(Disciplina){
        $scope.disciplinas.save(Disciplina);
        $scope.disciplinas.post();
        $state.go('layout.disciplinas');
    };
})