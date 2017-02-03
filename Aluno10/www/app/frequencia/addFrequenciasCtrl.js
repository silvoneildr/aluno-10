angular.module('app.addFrequencias', [])
.controller('addFrequenciasCtrl', function($scope, $state, $stateParams, daoFactory){
    $scope.selected    = false;
    $scope.alunos      = daoFactory.getAlunos();
    $scope.disciplina  = daoFactory.getDisciplinas().getById(parseInt($stateParams.disciplinaId));
    $scope.frequencias = daoFactory.getFrequencias();
    $scope.frequencia  = daoFactory.getFrequencias().getById(parseInt($stateParams.frequenciaId));

    $scope.checkAll = function(){
        $scope.selected = !$scope.selected;
		
        for (var i = 0; i < $scope.frequencia.alunos.length ; i++) {
			$scope.frequencia.alunos[i].presente = $scope.selected;
		}
	};

    $scope.editFrequencia = function(record){
        $scope.frequencia.alunos = OjsUtils.cloneObject(record);
        $scope.frequencias.save($scope.frequencia);
        $scope.frequencias.post();

        $state.go('layout.frequencias',{disciplinaId: $scope.disciplina.id});
    };
})