angular.module('app.db.dao',[]).factory('DbDaoFact', function() {
    var db = new DbFactory(DbProxies.LOCALSTORAGE),
        alunos = db.createDataSet('alunos');
    
    return {
        getAlunos: function() {
            return alunos.open();
        }
    }
});