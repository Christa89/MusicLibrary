'use strict';

// Demonstrate how to register services
// In this case it is a simple value service.
var app = angular.module('app.services', []);

app.service('dataService', ['$http', function ($http) {

    this.getObject = function (urlBase) {
        return $http.get(urlBase);
    };

    this.getObjectByid = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    this.insertObject = function (urlBase,obj) {
        return $http.post(urlBase, obj);
    };

    this.updateObject = function (obj) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    this.deleteObject = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

 
}]);
