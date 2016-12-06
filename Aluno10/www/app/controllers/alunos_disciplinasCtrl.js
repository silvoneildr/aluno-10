angular.module('app.alunos.disciplinas', [])
.controller('alunos_disciplinasCtrl', function($scope, $stateParams, daoFactory){
	$scope.alunosDisciplina = daoFactory.getAlunosDisciplina();
	$scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.id));

	$scope.addAlunosDisciplina = function(){
		//
	}

	$scope.deleteAlunosDisciplina = function(){
		//
	}
});