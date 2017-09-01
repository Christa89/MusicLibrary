'use strict';

var app = angular.module('app.filters', [])

    app.filter('interpolate', ['version', function (version) {
        return function (text) {
            return String(text).replace(/\%VERSION\%/mg, version);
        }
    }]);

    //app.filter('startFrom', function () {
    //    return function (input, start) {
    //        if (input) {
    //            start = +start;
    //            return input.slice(start);
    //        }
    //        return [];
    //    };
    //});