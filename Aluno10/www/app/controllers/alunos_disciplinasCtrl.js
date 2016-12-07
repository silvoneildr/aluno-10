angular.module('app.alunos.disciplinas', [])
.controller('alunos_disciplinasCtrl', function($scope, $stateParams, $ionicModal, daoFactory, msgFactory){

	$scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.id));
	$scope.alunos = daoFactory.getAlunos();
	$scope.selected = false;
	
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
		$scope.selected = !$scope.selected;
	};

	$scope.addAlunos = function(){
		var listaAlunos = $scope.alunos,
			listaMarcados = [];

		for (var i = 0; i< listaAlunos.data.length ; i++) {
			if (listaAlunos.data[i].isChecked) {
				listaMarcados.push(listaAlunos.data[i]); 
			}
		}
		$scope.disciplina.alunos = listaMarcados;
	};

	$scope.deleteAluno = function(aluno){
		msgFactory.confirm('Deseja excluir o aluno da disciplina?').then(function(res) {
            if (!res) return;
          	$scope.disciplina.alunos.delete(aluno);
        	$scope.disciplina.alunos.post();
        })	
	};
});