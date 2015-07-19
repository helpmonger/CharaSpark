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



    .directive('wishSummary', function($templateCache) {
        return {
             // templateUrl: '../templates/directives/wishSummary.html'
            template: $templateCache.get('templates/directives/wishSummary.html')
        };
    })

    .directive('wishDetail', function($templateCache){
        return{
            template: $templateCache.get('templates/directives/wishDetail.html')
        };
    });


    .directive('isUserNameUnique', function($templateCache){
        return{
            template: $templateCache.get('templates/directives/isUserNameUnique.html')
        };
    });

    
})();
