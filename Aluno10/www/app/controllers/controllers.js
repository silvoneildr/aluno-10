angular.module('app.controllers', [])
  
.controller('alunosCtrl', ['$scope', '$stateParams', 
function ($scope, $stateParams, DbDaoFact) {
//    $scope.alunos = DbDaoFact.getAlunos;
        
    $scope.addRecord = function() {
        $scope.modal.show();
    }

}])
   
.controller('escolasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('disciplinasCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('aluno10Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('configuracaoCtrl',['$scope', '$stateParams', function($scope, $stateParams){

}])