angular.module('app.addFrequencias', [])
.controller('addFrequenciasCtrl', function($scope, $state, $stateParams, daoFactory){

    $scope.selected = false;
    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.frequencias = daoFactory.getFrequencias();
    $scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.disciplinaId));
    $scope.frequencia = daoFactory.getAlunosFrequencia().getById(parseInt($stateParams.frequenciaId));
    $scope.alunosFrequencia = daoFactory.getAlunosFrequencia();

    for (var i = 0; i < $scope.disciplina.alunos.length ; i++) {
        $scope.listaAdd ={
            nome: $scope.disciplina.alunos[i].nome,
            numero: $scope.disciplina.alunos[i].numero,
            presente: false
        }
    }

    $scope.checkAll = function(){
		$scope.selected = !$scope.selected;
		for (var i = 0; i < $scope.disciplina.alunos.length ; i++) {
			$scope.disciplina.alunos[i].isPresent = $scope.selected;
		}
	};

    $scope.save =  function (record){
        $scope.alunosFrequencia.save(record);
        $scope.alunosFrequencia.post();
    };

    $scope.addFreqAlunos = function(){
        if (!$scope.listaFrequencias) {
                $scope.listaFrequencias = [];
        };

        for (var i = 0; i < $scope.disciplina.alunos.length ; i++) {
                $scope.listaFrequencias.push({
                    idFrequencia: parseInt($stateParams.frequenciaId),
                    idAluno: $scope.disciplina.alunos[i].id,
                    presente: $scope.disciplina.alunos[i].isPresent
                });
        };
        $scope.save($scope.listaFrequencias);
        $state.go('layout.frequencias',{disciplinaId: $scope.disciplina.id});
    };


})