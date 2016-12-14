angular.module('app.frequencias', [])
.controller('frequenciasCtrl', function($scope, $ionicModal, daoFactory, msgFactory){
    
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

    $scope.frequencias = daoFactory.getFrequencias();

    $scope.saveRecord = function(){
        $scope.frequencias.save($scope.frequencia);
        $scope.frequencias.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(frequencia){
        msgFactory.confirm('Deseja excluir a frequencia?').then(function(res) {
            if (!res) return;
            $scope.frequencias.delete(frequencia);
            $scope.frequencias.post();
        })
    };
    
    $scope.editRecord = function(frequencia){
        $scope.frequencia =  OjsUtils.cloneObject(frequencia);
        $scope.inserting = false;
        $scope.modal.show();
    };

})