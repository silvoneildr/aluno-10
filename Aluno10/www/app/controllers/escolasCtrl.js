angular.module('app.escolas.lista', [])
.controller('escolasCtrl', function($scope, $ionicModal, daoFactory, msgFactory) {

    $ionicModal.fromTemplateUrl('app/views/cad_escolas.html',{
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
        $scope.escola = {};
        $scope.inserting = true;
        $scope.modal.show();
    };
    
    $scope.escolas = daoFactory.getEscolas();
    
    $scope.saveRecord = function(){
        $scope.escolas.save($scope.escola);
        $scope.escolas.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(escola){
        msgFactory.confirm('Deseja excluir a escola?').then(function(res) {
            if (!res) return;
            $scope.escolas.delete(escola);
            $scope.escolas.post();
        })
    };
    
    $scope.editRecord = function(escola){
        $scope.escola =  OjsUtils.cloneObject(escola);
        $scope.inserting = false;
        $scope.modal.show();
    };

});