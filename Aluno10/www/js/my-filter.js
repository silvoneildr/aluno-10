angular.module('app.my-filter', [])
.filter('myFilter', function($filter) {
    return function(input, search){
        var _re = new RegExp(search, 'i'),
            _checkProp = function(item) {
                var field, dateField;
                                
                for(var fieldName in item) {  
                  field = item[fieldName] || '';
                                    
                  if (angular.isArray(field)) {
                    if (_itemsMatched(field)) {
                        return true;
                    } 
                    continue;
                  }
                
                  if (angular.isDate(field)) {                    
                    dateField = $filter('date')(field, 'dd/MM/yyyy');
                    
                    if (_re.test(dateField)){
                      return true;
                    }                      
                    continue;  
                  }
                  
                  if (angular.isObject(field)) {                      
                    if (_checkProp(field)) {
                        return true;                      
                    }
                    continue;
                  }
                  
                  if (_re.test(field.toString()))
                    return true;
                }
            },
            _itemsMatched = function(items) {
                return items.some(function(item){
                    return _checkProp(item);
                });                  
            };
        
        return input.query(_checkProp);
    }
});