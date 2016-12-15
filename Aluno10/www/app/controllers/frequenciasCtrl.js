angular.module('app.frequencias', [])
.controller('frequenciasCtrl', function($scope, $ionicModal, $ionicPopover, popupFactory, daoFactory, msgFactory){
    
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