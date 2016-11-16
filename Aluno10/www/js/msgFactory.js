angular.module('app.mensagens', [])
.factory('msgFactory', function($ionicPopup) {
    return {
        alert: function(msg, callback) {
            $ionicPopup.alert({
                title: 'Aluno 10',
                template: msg
            }).then(callback);
        },
        
        confirm: function(msg){
            return  $ionicPopup.confirm({
                title: 'Aluno 10',
                template: msg,
                cancelText: 'Cancelar',
                okText: 'OK'
            });
        }
    }
});