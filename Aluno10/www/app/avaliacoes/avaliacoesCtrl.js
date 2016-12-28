angular.module('app.avaliacoes', [])
.controller('avaliacoesCtrl', function($scope){
    $scope.listaAvaliacoes = daoFactory.getAvaliacoes()
        .filter({ disciplinaId: parseInt($stateParams.disciplinaId)});

    $scope.disciplina = daoFactory.getDisciplinas()
        .getById(parseInt($stateParams.disciplinaId));
        
    $scope.avaliacoes = daoFactory.getAvaliacoes();

})