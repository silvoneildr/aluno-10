angular.module('app.alunos.disciplinas', [])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('tabs', {
				abstract: true,
				templateUrl: 'app/alunos-disciplinas/alunos_disciplinas.html'
		})
		.state('tabs.lista', {
				url: '/Lista',
				views: {
					'tab-lista': {
						templateUrl: 'app/lista-de-alunos/listaAlunos.html',
						controller: 'listaAlunosCtrl'
					}
				}
		})

	$urlRouterProvider.otherwise('/tabs');
})

.controller('alunos_disciplinasCtrl', function($scope, $stateParams, $ionicModal, daoFactory, msgFactory){ 

	$scope.disciplinas = daoFactory.getDisciplinas();
	$scope.turmas = daoFactory.getTurmas();
	$scope.disciplina = daoFactory.getDisciplinas().getById(parseInt($stateParams.id));
	$scope.alunos = daoFactory.getAlunos();
	$scope.selected = false;
		
	$ionicModal.fromTemplateUrl('app/alunos-disciplinas/addAlunos.html', {
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
		for (var i = 0; i < $scope.alunos.data.length ; i++) {
			$scope.alunos.data[i].isChecked = false;
		}
		$scope.modal.show();
	};

	$scope.checkAll = function(){
		$scope.selected = !$scope.selected;
		for (var i = 0; i < $scope.alunos.data.length ; i++) {
			$scope.alunos.data[i].isChecked = $scope.selected; 
		}
	};

	$scope.addAlunos = function(){
		if (!$scope.disciplina.alunos) {
			$scope.disciplina.alunos = [];
		};

		for (var i = 0; i < $scope.alunos.data.length ; i++) {
			if ($scope.alunos.data[i].isChecked){
				var index = $scope.disciplina.alunos
					.map(function(item) { return item.id;})
					.indexOf($scope.alunos.data[i].id);
				
				if (index < 0){
					$scope.disciplina.alunos.push($scope.alunos.data[i]);
				}
			};
		};

		$scope.disciplinas.save($scope.disciplina);
        $scope.disciplinas.post();
        $scope.closeModal();
	};

	$scope.deleteAluno = function(aluno){
		msgFactory.confirm('Deseja excluir o aluno?').then(function(res) {
            if (!res) return;

			for(var i = $scope.disciplina.alunos.length - 1; i >= 0; i--) {
				if($scope.disciplina.alunos[i].id === aluno.id) {
					$scope.disciplina.alunos.splice(i, 1);
				}
			}
			$scope.disciplinas.save($scope.disciplina);
        	$scope.disciplinas.post();
		});
	};
});