angular.module('app.alunos.disciplinas', [])
.controller('alunos_disciplinasCtrl', function($scope, $stateParams, $ionicModal, daoFactory){

	$scope.alunosDisciplina = daoFactory.getAlunosDisciplina();
	$scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.id));
	$scope.alunos = daoFactory.getAlunos();
	$scope.checked = false;
	
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
		var listaAlunos = $scope.alunos
		$scope.checked = !$scope.checked;
		 
		for (i = 0; i < listaAlunos.data.length; i++) {
			listaAlunos.data[i].isChecked = $scope.checked;
		}	
	};

	$scope.deleteAlunosDisciplina = function(){
		//
	};
});