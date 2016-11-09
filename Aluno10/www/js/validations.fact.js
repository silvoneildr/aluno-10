angular.module('afvApp.utils.validations', [])
.factory('UtilsValidationsFact', function($timeout, $ionicScrollDelegate, $location) {
    return {        
        goToPane: function(paneId) {
            if (!paneId) return;
        
            var elem = document.getElementById(paneId);
            if (elem) {
                $timeout(function() { angular.element(elem).triggerHandler('click') }, 0);
            }
        },
         
        goToFirstFieldWithError: function(errors, delegateHandle) {
            var error, el, handle;
            
            for (var field in errors) {
                error = errors[field][0];
                
                if (!error) return;
                
                el = document.getElementsByName(error.$name)[0];                
                if (el) {                     
                    this.goToPane('pane-'.concat(el.dataset.pane));
                    
                    $location.hash(error.$name);
                    handle = $ionicScrollDelegate.$getByHandle(delegateHandle);
                    handle.anchorScroll();
                }                
                break;
            }
        }
    }
})
.directive('validateCpf', function($compile) {    
    return {        
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.bind("input submit", function () {                
//                console.log(ctrl.$$parentForm.$error);
//                console.log(ctrl);
              
                //valida o cpf                   
                ctrl.$setValidity('validateCpf', validaCPF(ctrl.$modelValue));
                scope.$apply();
            });

            /**
            * Calculate validity of string
            * @param {string} str
            * @returns {boolean}
            */
            function validaCPF(str) {
                if (str == null)
                    return true;

                str = str.replace('.', '');
                str = str.replace('.', '');
                str = str.replace('-', '');

                var cpf = str;
                var numeros, digitos, soma, i, resultado, digitos_iguais;
                
                digitos_iguais = 1;

                if (cpf.length < 11)
                    return false;

                for (i = 0; i < cpf.length - 1; i++)
                    if (cpf.charAt(i) != cpf.charAt(i + 1)) {
                        digitos_iguais = 0;
                        break;
                    }

                if (digitos_iguais)
                    return false;

                numeros = cpf.substring(0, 9);
                digitos = cpf.substring(9);
                soma = 0;

                for (i = 10; i > 1; i--)
                    soma += numeros.charAt(10 - i) * i;

                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;            
                if (resultado != digitos.charAt(0))
                    return false;

                numeros = cpf.substring(0, 10);
                soma = 0;

                for (i = 11; i > 1; i--)
                    soma += numeros.charAt(11 - i) * i;

                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                    return false;

                return true;
            }
        }
    };    
})
.directive('validateCnpj', function() {    
    return {        
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            element.bind("input submit", function () {
                ctrl.$setValidity('validateCnpj', validaCNPJ(ctrl.$modelValue));
                scope.$apply();                  
            });        

            /**
            * Calculate validity of string
            * @param {string} str
            * @returns {boolean}
            */
            function validaCNPJ(str) {
                if (str == null)
                    return true;

                str = str.replace(/\./g, '');
                str = str.replace('/', '');
                str = str.replace('-', '');

                var cnpj = str;
                var tamanho;
                var numeros;
                var digitos;
                var soma;
                var pos;
                var resultado;
                var i;

                if (cnpj == '')
                    return false;

                if (cnpj.length != 14)
                    return false;

                // Regex to validate strings with 14 same characters
                var regex = /([0]{14}|[1]{14}|[2]{14}|[3]{14}|[4]{14}|[5]{14}|[6]{14}|[7]{14}|[8]{14}|[9]{14})/g
                // Regex builder
                var patt = new RegExp(regex);
                if (patt.test(cnpj))
                    return false;

                // Valida DVs
                tamanho = cnpj.length - 2
                numeros = cnpj.substring(0, tamanho);
                digitos = cnpj.substring(tamanho);
                soma = 0;
                pos = tamanho - 7;                
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;                    
                    if (pos < 2)
                        pos = 9;
                }
                
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(0))
                    return false;

                tamanho = tamanho + 1;
                numeros = cnpj.substring(0, tamanho);
                soma = 0;
                pos = tamanho - 7;                
                for (i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2)
                        pos = 9;
                }
                
                resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
                if (resultado != digitos.charAt(1))
                    return false;

                return true;
            }
        }
    };    
})
.directive('format', ['$filter', function($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
            if (!ctrl) return;

            var decimals = attrs.decimals ? parseInt(attrs.decimals) : 1,
                parser = function(value) {
                    return value;
                },
                formatter = function() {};
            
            function currencyParser(value) {
				var actualNumber = value.replace(/[^\d]+/g,''),
                    formatedValue;
                
				actualNumber = actualNumber.replace(/^[0]+([1-9])/,'$1');
				formatedValue = parseInt(actualNumber) / Math.pow(10, decimals);
                
                elem[0].value = formatedValue.toFixed(decimals).toString();
                
                return elem[0].value;
            };
            
            switch(attrs.type) {
                case 'date':
                case 'datetime':
                case 'datetime-local':
                    formatter = function(value) {
                        if (!ctrl.$isEmpty(value)) {
                            return new Date(value);
                        }
                    };
                    break;
                case 'tel':
                case 'text':
                    if (attrs.decimals && attrs.decimals.trim() !== '') {
                        formatter = function(value) {
                            if (ctrl.$isEmpty(value)) {
                                return value;
                            }
                            return parseFloat(value).toFixed(decimals).toString();
                        };
                        parser = currencyParser;
                    }
                    break;
            }
            
            ctrl.$formatters.push(formatter);

            ctrl.$parsers.push(parser);
        }
    }
}])
;