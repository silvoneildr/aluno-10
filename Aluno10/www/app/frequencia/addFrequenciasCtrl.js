angular.module('app.addFrequencias', [])
.controller('addFrequenciasCtrl', function($scope, $state, $stateParams, daoFactory){

    $scope.selected = false;
    $scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.disciplinaId));
    $scope.alunosFrequencia = daoFactory.getAlunosFrequencia();
    $scope.alunos = daoFactory.getAlunos();

    $scope.lista = $scope.disciplina.alunos;

    // if (!result) {
    //     $scope.Lista = $scope.disciplina.alunos;
    // } else {
    //     $scope.Lista = result;
    // }

    $scope.checkAll = function(){
        $scope.selected = !$scope.selected;
		
        for (var i = 0; i < $scope.disciplina.alunos.length ; i++) {
			$scope.disciplina.alunos[i].presente = $scope.selected;
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
                idAluno: $scope.disciplina.alunos[i],
                presente: true
            });
        };

        $scope.save($scope.listaFrequencias);
        $state.go('layout.frequencias',{disciplinaId: $scope.disciplina.id});
    };
})