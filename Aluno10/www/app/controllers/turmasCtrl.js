angular.module('app.turmas.lista', [])
.controller('turmasCtrl', function($scope, $ionicModal, daoFactory, msgFactory) {
	
	$ionicModal.fromTemplateUrl('app/views/cad_turmas.html',{
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
        $scope.turma = {};
        $scope.inserting = true;
        $scope.modal.show();
    };
    
    $scope.turmas = daoFactory.getTurmas();
    
    $scope.saveRecord = function(){
        $scope.turmas.save($scope.turma);
        $scope.turmas.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(turma){
        msgFactory.confirm('Deseja excluir a turma?').then(function(res) {
            if (!res) return;
            $scope.turmas.delete(turma);
            $scope.turmas.post();
        })
    };
    
    $scope.editRecord = function(turma){
        $scope.turma =  OjsUtils.cloneObject(turma);
        $scope.inserting = false;
        $scope.modal.show();
    };
});