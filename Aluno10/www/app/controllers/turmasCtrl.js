angular.module('app.turmas.lista', [])
.controller('turmasCtrl', function($scope, $state, $ionicModal, DbDaoFact, UtilsMsgFact, UtilsPopupFact) {
	
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
        $state.go('layout.cad_turmas');
    };
    
    $scope.turmas = DbDaoFact.getTurmas();
    
    $scope.addDisciplina = function(){
        $scope.disciplina = {};
        $scope.inserting = true;
        $scope.modal.show();
    };

    UtilsPopupFact.initPopMenu('app/views/popover.tmpl.html', $scope);

    $scope.showPopup = function(turma, event) {
        $scope.turma =  OjsUtils.cloneObject(turma);
        $scope.inserting = false;
        $scope.popover.show(event);
    }
    
    $scope.closePopover = function(){
        $scope.popover.hide();
    }
    
    $scope.saveRecord = function(){
        $scope.turmas.save($scope.turma);
        $scope.turmas.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(turma){
        $scope.closePopover();
        UtilsMsgFact.confirm('Deseja excluir a turma?').then(function(res) {
            if (!res) return;
            $scope.turmas.delete(turma);
            $scope.turmas.post();
        })
    };
    
    $scope.editRecord = function(){
        $scope.closePopover();
        $scope.modal.show();
    };
});