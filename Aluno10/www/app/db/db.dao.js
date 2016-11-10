angular.module('app.db.dao',[]).factory('DbDaoFact', function() {
    var db = new DbFactory(DbProxies.LOCALSTORAGE),
        alunos = db.createDataSet('alunos'),
        escolas = db.createDataSet('escolas'),
        disciplinas = db.createDataSet('disciplinas');
    
    return {
        getAlunos: function() {
            return alunos.open();
        },
        getEscolas: function() {
            return escolas.open();
        },
        getDisciplinas: function() {
            return disciplinas.open();
        }                
    }
});