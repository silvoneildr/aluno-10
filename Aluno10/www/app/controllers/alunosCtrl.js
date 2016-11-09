angular.module('app.alunos.lista', [])
.controller('alunosCtrl', function($scope, $ionicModal, DbDaoFact, UtilsMsgFact) {

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
        $scope.modal.show();
    };
    
    $scope.alunos = DbDaoFact.getAlunos();
    
    $scope.saveRecord = function(){
        $scope.alunos.save($scope.aluno);
        $scope.alunos.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(aluno){
        UtilsMsgFact.confirm('Deseja excluir o aluno?').then(function(res) {
            if (!res) return;
            $scope.alunos.delete(aluno);
            $scope.alunos.post();
        })
    };

});