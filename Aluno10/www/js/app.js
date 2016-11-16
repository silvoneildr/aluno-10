// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    'app.dao',
    'app.cadform',
    'app.popups',
    'app.alunos.lista',
    'app.escolas.lista',
    'app.disciplinas.lista',
    'app.turmas.lista',
    'app.configuracao',
    'app.layout',
    'app.mensagens',
    'app.directives',
    'app.services'
])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    
    .state('layout', {
        abstract: true,
        templateUrl: 'app/views/layout.html',
        controller: 'layoutCtrl'
    })
    
    .state('layout.alunos', {
        url: '/Alunos',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/alunos.html',
            controller: 'alunosCtrl'
          }
        }
    })

    .state('layout.escolas', {
        url: '/Escolas',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/escolas.html',
            controller: 'escolasCtrl'
          }
        }
    })

    .state('layout.disciplinas', {
        url: '/Disciplinas',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/disciplinas.html',
            controller: 'disciplinasCtrl'
          }
        }
    })

    .state('layout.turmas', {
        url: '/Turmas',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/turmas.html',
            controller: 'turmasCtrl'
          }
        }
    })
    
        .state('layout.cad_turmas', {
        url: '/CadTurmas',
        views: {
          'side-menu21': {
            templateUrl: 'app/views/cad_turmas.html',
            controller: 'turmasCtrl'
          }
        }
    })

    .state('layout.configuracao', {
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