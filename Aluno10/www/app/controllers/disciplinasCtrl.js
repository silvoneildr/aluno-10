angular.module('app.disciplinas.lista', [])
.controller('disciplinasCtrl', function($scope, $ionicModal, $state, daoFactory, msgFactory) {

//    $ionicModal.fromTemplateUrl('app/views/cad_disciplinas.html',{
//        scope: $scope
//    }).then(function(modal){
//        $scope.modal = modal;
//    });
    
//    $scope.$on('$destroy', function() {
//        $scope.modal.remove();
//    });
//    
//    $scope.closeModal = function() {
//        $scope.modal.hide();
//    };
    
    $scope.addRecord = function() {
        $state.go('layout.cad_disciplinas');
    };
    
    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.turmas = daoFactory.getTurmas();
    
    $scope.saveRecord = function(Disciplina){
        $scope.disciplinas.save(Disciplina);
        $scope.disciplinas.post();
        $state.go('layout.disciplinas');
    };
    
    $scope.deleteRecord = function(disciplina){
        msgFactory.confirm('Deseja excluir a disciplina?').then(function(res) {
            if (!res) return;
            $scope.disciplinas.delete(disciplina);
            $scope.disciplinas.post();
        })
    };
    
    $scope.editRecord = function(disciplina){
        $scope.disciplina =  OjsUtils.cloneObject(disciplina);
        $scope.inserting = false;
        $state.go('layout.cad_disciplinas',{id: disciplina.id});
    };

});