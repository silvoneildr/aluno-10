angular.module('app.turmas.lista', [])
.controller('turmasCtrl', function($scope, $state, $ionicModal, daoFactory, msgFactory, popupFactory) {
	
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
    
    $scope.turmas = daoFactory.getTurmas();
    
    $scope.addDisciplina = function(){
        $scope.disciplina = {};
        $scope.inserting = true;
        $scope.modal.show();
    };

    popupFactory.startPopup('app/views/popup_turmas.html', $scope);

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
        msgFactory.confirm('Deseja excluir a turma?').then(function(res) {
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