angular.module('app.alunos.disciplinas', [])
.controller('alunos_disciplinasCtrl', function($scope, $stateParams, $ionicModal, daoFactory){

	$scope.alunosDisciplina = daoFactory.getAlunosDisciplina();
	$scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.id));
	$scope.alunos = daoFactory.getAlunos();
	
	$ionicModal.fromTemplateUrl('app/views/addAlunos.html', {
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

	$scope.showAlunos = function(){
		$scope.modal.show();
	};

	$scope.checkAll = function(){
		//
	};

	$scope.deleteAlunosDisciplina = function(){
		//
	};
});