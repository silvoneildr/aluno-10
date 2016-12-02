angular.module('app.disciplinas.lista', [])
.controller('disciplinasCtrl', function($scope, $ionicModal, $ionicPopover, $state, daoFactory, msgFactory, popupFactory) {
    
    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.turmas = daoFactory.getTurmas();

    popupFactory.startPopup('./app/views/popup_disciplinas.html', $scope);

    $scope.openPopup = function(event){
        // $scope.disciplinas = OjsUtils.cloneObject(disciplina);
        // $scope.inserting = false;
        $scope.popover.show(event);
    };   

    $scope.addRecord = function() {
        $state.go('layout.cad_disciplinas');
    };
    
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