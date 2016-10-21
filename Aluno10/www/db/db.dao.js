angular.module('app.db.dao',[]).factory('DbDaoFact', function() {
    var db = new DbFactory(DbProxies.SQLITE, 'app'),
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