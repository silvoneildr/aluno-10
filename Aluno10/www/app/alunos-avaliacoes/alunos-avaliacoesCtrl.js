angular.module('app.alunos-avaliacoes', [])
.controller('alunos-avaliacoesCtrl', function($scope, $state, $stateParams, daoFactory){
    $scope.alunos     = daoFactory.getAlunos();
    $scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.disciplinaId));   
    $scope.avaliacoes = daoFactory.getAvaliacoes();
    $scope.avaliacao  = daoFactory.getAvaliacoes().getById(parseInt($stateParams.avaliacaoId));

    $scope.editAvaliacao = function(record){
        $scope.avaliacao.alunos = OjsUtils.cloneObject(record);
        $scope.avaliacoes.save($scope.avaliacao);
        $scope.avaliacoes.post();
        $state.go('layout.avaliacoes', {disciplinaId: $scope.disciplina.id});
    };
})