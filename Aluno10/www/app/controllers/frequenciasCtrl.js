angular.module('app.frequencias', [])
.controller('frequenciasCtrl', function($scope, $ionicModal, $ionicPopover, $stateParams, popupFactory, daoFactory, msgFactory){

    $scope.listaFrequencias = daoFactory.getFrequencias()
        .filter({ disciplinaId: parseInt($stateParams.disciplinaId)});

    $scope.disciplina = daoFactory.getDisciplinas()
        .getById(parseInt($stateParams.disciplinaId));
        
    $scope.frequencias = daoFactory.getFrequencias();

    $ionicModal.fromTemplateUrl('app/views/cad_frequencias.html',{
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
        $scope.frequencia = {};
        $scope.inserting = true;
        $scope.modal.show();
    };

    $scope.saveRecord = function(){
        $scope.frequencia.disciplinaId = $stateParams.disciplinaId;
        $scope.frequencias.save($scope.frequencia);
        $scope.frequencias.post();
        $scope.closeModal();
    };

    popupFactory.startPopup('./app/views/popup_frequencias.html', $scope);

    $scope.openPopover = function(frequencia, event){
        $scope.frequencia = frequencia;
        $scope.popover.show(event);
    };
    
    $scope.deleteRecord = function(){
        msgFactory.confirm('Deseja excluir a frequencia?').then(function(res) {
            if (!res) return;
            $scope.frequencias.delete($scope.frequencia);
            $scope.frequencias.post();
        });
        $scope.popover.hide();
    };
})