angular.module('app.alunos.lista', [])
.controller('alunosCtrl', function($scope) {

    $scope.alunos = [
    	{
    		nome: 'Silvonei Rosa',
    		endereco: 'Rua Santo Antônio, 221, Centro',
    		cidade: 'Campo Belo - MG',
    		imgUser: 'avatar1.png'
    	},
    	{
    		nome: 'João da Silva',
    		endereco: 'Rua Sete de Setembro, Centro',
    		cidade: 'Campo Belo - MG',
    		imgUser: 'avatar3.png'

    	},
    	{
    		nome: 'Maria Ambrosina de Jesus',
    		endereco: 'Av Afonso Pena, Centro',
    		cidade: 'Campo Belo - MG',
    		imgUser: 'avatar2.png'
    	}
    	
    ]

})