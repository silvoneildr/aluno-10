angular.module('app.alunos.lista', [])
.controller('alunosCtrl', function($scope,$ionicModal) {

    $scope.alunos = [
    	{
    		nome: 'Silvonei Rosa',
    		endereco: 'Rua Santo Antônio, 221, Centro',
    		cidade: 'Campo Belo - MG',
            sexo: 'M',
    		imgUser: 'avatar3.png'
    	},
    	{
    		nome: 'João da Silva',
    		endereco: 'Rua Sete de Setembro, Centro',
    		cidade: 'Campo Belo - MG',
            sexo: 'M',
    		imgUser: 'avatar3.png'

    	},
    	{
    		nome: 'Maria Ambrosina de Jesus',
    		endereco: 'Av Afonso Pena, Centro',
    		cidade: 'Campo Belo - MG',
            sexo: 'F',
    		imgUser: 'avatar2.png'
    	}
    	
    ];
    $ionicModal.fromTemplateUrl('app/views/cad_alunos.html',{
        scope: $scope,
        animation: 'fade-in'
    }).then(function(modal){
        $scope.modal = modal;
    });
    $scope.addAluno = function(aluno){
        if (aluno.sexo == 'M'){
            $scope.img = 'avatar3.png'    
        } else{
            $scope.img = 'avatar2.png'
        }
        $scope.alunos.push({
            nome:aluno.nome,
            endereco:aluno.endereco,
            cidade:aluno.cidade,
            sexo:aluno.sexo,
            imgUser: $scope.img
        });
        aluno.nome="";
        aluno.endereco="";
        aluno.cidade="";
        aluno.sexo = 'M';
        $scope.modal.hide();
        
    };
    $scope.openModal = function() {
        $scope.modal.show();
    };
    $scope.closeModal = function() {
        $scope.modal.hide();
    };
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });


})



