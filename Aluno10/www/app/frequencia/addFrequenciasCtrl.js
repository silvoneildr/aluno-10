angular.module('app.addFrequencias', [])
.controller('addFrequenciasCtrl', function($scope, $state, $stateParams, daoFactory){
    $scope.disciplinas = daoFactory.getDisciplinas();
    $scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.disciplinaId));

    $scope.listaFrequencias = daoFactory.getFrequencias()
            .filter({ disciplinaId: parseInt($stateParams.disciplinaId)});

    $scope.frequencias = daoFactory.getFrequencias();
    $scope.frequencia = daoFactory.getFrequencias().getById(parseInt($stateParams.frequenciaId))
    $scope.selected = false;

    $scope.checkAll = function(){
		$scope.selected = !$scope.selected;
		for (var i = 0; i < $scope.disciplina.alunos.length ; i++) {
			$scope.disciplina.alunos[i].isPresent = $scope.selected; 
		}
	};

    $scope.addFreqAlunos = function(){
        if (!$scope.frequencia.listaAlunos) {
            $scope.frequencia.listaAlunos = [];
		};

        for (var i = 0; i < $scope.disciplina.alunos.length ; i++) {
            if ($scope.disciplina.alunos[i].isPresent){
				var index = $scope.frequencia.listaAlunos
					.map(function(item) { return item.idAluno; })
					.indexOf($scope.disciplina.alunos[i].id);
				
				if (index < 0){
                    $scope.frequencia.listaAlunos.push({idAluno: $scope.disciplina.alunos[i].id});
				};
			};
            console.log($scope.disciplina.alunos[i].isPresent);
		};
        $scope.frequencias.save($scope.frequencia);
        $scope.frequencias.post();
    }
})