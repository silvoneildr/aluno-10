angular.module('app.avaliacoes', [])
.controller('avaliacoesCtrl', function($scope, $ionicModal, $ionicPopover, $stateParams, 
    popupFactory, daoFactory, msgFactory){

    $scope.refresh = function(){
        $scope.listaAvaliacoes = daoFactory.getAvaliacoes()
            .filter({ disciplinaId: parseInt($stateParams.disciplinaId)});
    }

    $scope.refresh();

    $scope.disciplina = daoFactory.getDisciplinas()
        .getById(parseInt($stateParams.disciplinaId));
        
    $scope.avaliacoes = daoFactory.getAvaliacoes();

    $ionicModal.fromTemplateUrl('app/avaliacoes/cad_avaliacoes.html', {
        scope: $scope
    }).then(function(modal){
        $scope.modal = modal;
    });
        
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });
    
    $scope.closeModal = function() {
        $scope.modal.hide();
    };

    $scope.addRecord = function() {
        $scope.avaliacao = {};
        $scope.inserting = true;
        $scope.modal.show();
    };

    $scope.saveRecord = function(){
        $scope.listaDeAlunos = [];

        for (var i = 0; i < $scope.disciplina.alunos.length ; i++) {
            $scope.listaDeAlunos.push({
                idAluno: $scope.disciplina.alunos[i],
                nota: 0
            });
        };

        $scope.avaliacao.disciplinaId = $stateParams.disciplinaId;
        $scope.avaliacao.alunos = $scope.listaDeAlunos;
        $scope.avaliacoes.save($scope.avaliacao);
        $scope.avaliacoes.post();
        $scope.closeModal();
        $scope.refresh();
    };

    $scope.deleteRecord = function(avaliacao){
        msgFactory.confirm('Deseja excluir a avaliação?').then(function(res) {
            if (!res) return;
            $scope.avaliacoes.delete(avaliacao);
            $scope.avaliacoes.post();
            $scope.refresh();
        });
    };
})