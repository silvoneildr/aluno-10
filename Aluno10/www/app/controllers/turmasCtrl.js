angular.module('app.turmas.lista', [])
.controller('turmasCtrl', function($scope, $ionicModal, DbDaoFact, UtilsMsgFact, UtilsPopupFact) {
	
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
    
    $scope.turmas = DbDaoFact.getTurmas();

    UtilsPopupFact.initPopMenu('app/views/popover.tmpl.html', $scope);

    $scope.showPopup = function(turma, event) {
        $scope.turma =  OjsUtils.cloneObject(turma);
        $scope.inserting = false;
        $scope.popover.show(event);
    } 
    
    $scope.saveRecord = function(){
        $scope.turmas.save($scope.turma);
        $scope.turmas.post();
        $scope.closeModal();
    };
    
    $scope.deleteRecord = function(turma){
        UtilsMsgFact.confirm('Deseja excluir a turma?').then(function(res) {
            if (!res) return;
            $scope.turmas.delete(turma);
            $scope.turmas.post();
        })
    };
    
    $scope.editRecord = function(turma){
        // $scope.turma =  OjsUtils.cloneObject(turma);
        // $scope.inserting = false;
        $scope.modal.show();
    };
});