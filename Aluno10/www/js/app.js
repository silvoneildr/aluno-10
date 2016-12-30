// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', [
    'ionic',
    'app.dao',
    'app.popups',
    'app.alunos',
    'app.escolas',
    'app.disciplinas',
    'app.cad_disciplinas',
    'app.alunos.disciplinas',
    'app.turmas',
    'app.frequencias',
    'app.avaliacoes',
    'app.inicio',
    'app.layout',
    'app.mensagens',
    'app.my-select',
    'app.modal-factory',
    'app.addFrequencias'
])
.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('layout', {
          abstract: true,
          templateUrl: 'app/layout/layout.html',
          controller: 'layoutCtrl'
      })
      
      .state('layout.alunos', {
          url: '/Alunos',
          views: {
            'side-menu21': {
              templateUrl: 'app/alunos/alunos.html',
              controller: 'alunosCtrl'
            }
          }
      })

      .state('layout.escolas', {
          url: '/Escolas',
          views: {
            'side-menu21': {
              templateUrl: 'app/escolas/escolas.html',
              controller: 'escolasCtrl'
            }
          }
      })

      .state('layout.turmas', {
          url: '/Turmas',
          views: {
            'side-menu21': {
              templateUrl: 'app/turmas/turmas.html',
              controller: 'turmasCtrl'
            }
          }
      })

      .state('layout.disciplinas', {
          url: '/Disciplinas',
          views: {
            'side-menu21': {
              templateUrl: 'app/disciplinas/disciplinas.html',
              controller: 'disciplinasCtrl'
            }
          }
      })
      
      .state('layout.cad_disciplinas', {
          url: '/cad_disciplinas/:id',
          views: {
            'side-menu21': {
              templateUrl: 'app/disciplinas/cad_disciplinas.html',
              controller: 'cad_disciplinasCtrl'
            }
          }
      })
      
      .state('layout.frequencias', {
          url: '/Frequencia/:disciplinaId',
          views: {
            'side-menu21': {
              templateUrl: 'app/frequencia/frequencias.html',
              controller: 'frequenciasCtrl'
            }
          }
      })

      .state('layout.avaliacoes', {
          url: '/Avaliacoes/:disciplinaId',
          views: {
            'side-menu21': {
              templateUrl: 'app/avaliacoes/avaliacoes.html',
              controller: 'avaliacoesCtrl'
            }
          }
      })

      .state('layout.alunos_disciplinas', {
          url: '/Lista/:id',
          views: {
            'side-menu21': {
              templateUrl: 'app/alunos-disciplinas/alunos_disciplinas.html',
              controller: 'alunos_disciplinasCtrl'
            }
          }
      })

      .state('layout.addFrequencias', {
          url: '/addFrequencias/:disciplinaId, :frequenciaId',
          views: {
            'side-menu21': {
              templateUrl: 'app/frequencia/addFrequencias.html',
              controller: 'addFrequenciasCtrl'
            }
          }
      })

      .state('layout.inicio', {
          url: '/Inicio',
          views: {
            'side-menu21': {
              templateUrl: 'app/inicio/inicio.html',
              controller: 'inicioCtrl'
            }
          }
      });
    
    $urlRouterProvider.otherwise('/Inicio');
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