angular.module('app.frequencias', [])
.controller('frequenciasCtrl', function($scope, $state, $ionicModal, $ionicPopover, $stateParams,
daoFactory, msgFactory, modalFactory){
    $scope.refresh = function(){
        $scope.listaFrequencias = daoFactory.getFrequencias()
            .filter({ disciplinaId: parseInt($stateParams.disciplinaId)});
    };

    $scope.refresh();

    $scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.disciplinaId));
    $scope.frequencias = daoFactory.getFrequencias();
    
    modalFactory.showModal('app/frequencia/cad_frequencias.html', $scope);
   
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    
    $scope.addRecord = function() {
        $scope.frequencia = {};
        $scope.inserting = true;
        $scope.modal.show();
    };

    $scope.saveRecord = function(){
        $scope.frequencia.disciplinaId = $stateParams.disciplinaId;
        $scope.frequencias.save($scope.frequencia);
        $scope.frequencias.post();
        $scope.closeModal();
        $scope.refresh();
    };
    
    $scope.deleteRecord = function(frequencia){
        msgFactory.confirm('Deseja excluir a frequencia?').then(function(res) {
            if (!res) return;
            $scope.frequencias.delete(frequencia);
            $scope.frequencias.post();
            $scope.refresh();
        });
    };

    $scope.addFrequencia = function(frequencia){
        $state.go('layout.addFrequencias',{
            disciplinaId: $scope.disciplina.id, 
            frequenciaId: frequencia.id
        });
    }
})
