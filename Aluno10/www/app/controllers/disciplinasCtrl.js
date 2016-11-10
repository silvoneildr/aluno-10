angular.module('app.disciplinas.lista', [])
.controller('disciplinasCtrl', function($scope, $ionicModal, DbDaoFact, UtilsMsgFact) {

    $ionicModal.fromTemplateUrl('app/views/cad_disciplinas.html',{
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
        $scope.disciplina = {};
        $scope.inserting = true;
        $scope.modal.show();
    };
    
    $scope.disciplinas = DbDaoFact.getDisciplinas();
    
    $scope.saveRecord = function(){
        $scope.disciplinas.save($scope.disciplina);
        $scope.disciplinas.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(disciplina){
        UtilsMsgFact.confirm('Deseja excluir a disciplina?').then(function(res) {
            if (!res) return;
            $scope.disciplinas.delete(escola);
            $scope.disciplinas.post();
        })
    };
    
    $scope.editRecord = function(disciplina){
        $scope.disciplina =  OjsUtils.cloneObject(disciplina);
        $scope.inserting = false;
        $scope.modal.show();
    };

});