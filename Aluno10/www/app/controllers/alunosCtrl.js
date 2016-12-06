angular.module('app.alunos', [])
.controller('alunosCtrl', function($scope, $ionicModal, daoFactory, msgFactory) {

    $ionicModal.fromTemplateUrl('app/views/cad_alunos.html',{
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
        $scope.aluno = {};
        $scope.inserting = true;
        $scope.modal.show();
    };
    
    $scope.alunos = daoFactory.getAlunos();
    
    $scope.saveRecord = function(){
        $scope.alunos.save($scope.aluno);
        $scope.alunos.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(aluno){
        msgFactory.confirm('Deseja excluir o aluno?').then(function(res) {
            if (!res) return;
            $scope.alunos.delete(aluno);
            $scope.alunos.post();
        })
    };
    
    $scope.editRecord = function(aluno){
        $scope.aluno =  OjsUtils.cloneObject(aluno);
        $scope.inserting = false;
        $scope.modal.show();
    };

});