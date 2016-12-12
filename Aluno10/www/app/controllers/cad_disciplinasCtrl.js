angular.module('app.cad_disciplinas', [])
.controller('cad_disciplinasCtrl', function($scope, $state, $stateParams, daoFactory, msgFactory){

    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.turmas = daoFactory.getTurmas();

    if ($stateParams.id) {
        var disciplinaId = parseInt($stateParams.id);
        $scope.disciplina = OjsUtils.cloneObject( $scope.disciplinas.getById(disciplinaId));
    }

    $scope.saveRecord = function(Disciplina){
        $scope.disciplinas.save(Disciplina);
        $scope.disciplinas.post();
        $state.go('layout.disciplinas');
    };
})