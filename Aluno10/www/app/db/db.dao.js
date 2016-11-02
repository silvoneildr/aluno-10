angular.module('app.db.dao',[]).factory('DbDaoFact', function() {
    var db = new DbFactory(DbProxies.LOCALSTORAGE),
        alunos = db.createDataSet('alunos');
    
    return{
        getDb: function() {
            return db;
        },
        
        getAlunos: function(callback) {
            return alunos.open(callback);
        }
    }
    
});