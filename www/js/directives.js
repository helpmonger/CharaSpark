(function() {
    'use strict';

    angular.module('starter.directives', [])
        .directive('script', function() {
            return {
                restrict: 'E',
                scope: false,
                link: function(scope, elem, attr) {
                    if (attr.type === 'text/javascript-lazy') {
                        var code = elem.text();
                        var f = new Function(code);
                        f();
                    }
                }
            };
        })



    .directive('wishSummary', function() {
        return {
            templateUrl: '../templates/directives/wishSummary.html'
        };
    })

    .directive('wishDetail', function(){
        return{
            templateUrl: '../templates/directives/wishDetail.html'
        };
    })
    ;

})();
