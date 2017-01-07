angular.module('app.dao',[])
    .factory('daoFactory', function() {
    var db = new DbFactory(DbProxies.LOCALSTORAGE),
        alunos = db.createDataSet('alunos'),
        escolas = db.createDataSet('escolas'),
        turmas = db.createDataSet('turmas'),
        disciplinas = db.createDataSet('disciplinas'),
        frequencias = db.createDataSet('frequencias'),
        alunosFrequencia = db.createDataSet('alunosFrequencia');
        avaliacoes = db.createDataSet('avaliacoes');

    return {
        getAlunos: function() {
            return alunos.open();
        },
        getEscolas: function() {
            return escolas.open();
        },
        getTurmas: function(){
            return turmas.open();
        },
        getDisciplinas: function() {
            return disciplinas.open();
        },
        getFrequencias: function(){
            return frequencias.open();
        },
        getAlunosFrequencia: function(){
            return alunosFrequencia.open();
        },
        getAvaliacoes: function(){
            return avaliacoes.open();
        }
    }
});