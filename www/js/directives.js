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
            template: '{{wish.title}} <br /> {{wish._charity.name}} {{wish._donation.amount| \
              currency}} <br/> {{wish.createdDate | date: "short"}}'
        };
    })

    .directive('wishDetail', function(){
        return{
            template: '<p><font size="4">{{wish._charity.name}}<br/>{{wish.description \
            }} <br/>Wish Maker: {{wish._wishMaker.user_name}}<br/>{{wish.createdDate|date: "short"}}</p>'
        };
    })
    ;

})();
