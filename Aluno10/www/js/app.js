// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    'app.db.dao',
    'app.cadform',
    'app.utils.popup',
    'app.alunos.lista',
    'app.utils.msg',
    'app.controllers', 
    'app.directives',
    'app.services'
])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    
    .state('aluno10', {
        abstract: true,
        templateUrl: 'app/views/aluno10.html',
        controller: 'aluno10Ctrl'
    })
    
    .state('aluno10.alunos', {
        url: '/Alunos',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/alunos.html',
            controller: 'alunosCtrl'
          }
        }
    })

    .state('aluno10.escolas', {
        url: '/Escolas',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/escolas.html',
            controller: 'escolasCtrl'
          }
        }
    })

    .state('aluno10.disciplinas', {
        url: '/Disciplinas',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/disciplinas.html',
            controller: 'disciplinasCtrl'
          }
        }
    })

    .state('aluno10.configuracao', {
        url: '/Configuracao',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/configuracao.html',
            controller: 'configuracaoCtrl'
          }
        }
    });
    
    $urlRouterProvider.otherwise('/Alunos');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
      
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
      
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})