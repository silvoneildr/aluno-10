angular.module('app.cad_disciplinas', [])
.controller('cad_disciplinasCtrl', function($scope, $state, daoFactory, msgFactory){

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
    
})