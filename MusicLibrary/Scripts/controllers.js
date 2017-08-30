
'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    .controller('HomeCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'AngularJS SPA Template for Visual Studio';




      
    }])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', 'dataService', function ($scope, $location, $window, dataService) {

        var urlAlbum = 'http://localhost:8090/api/album';
        var urlArtist = 'http://localhost:8090/api/Artist';

  


        getalbums(urlAlbum);
        console.log('hai i am fine')
        function getalbums(urlBase) {
            dataService.getObject(urlAlbum).then(function (responce) {
                $scope.albums = responce.data
            }, function (eror) {

                alert(eror.message);
            });
        }

        GetArtist(urlArtist);
        function GetArtist(urlArtist) {
            dataService.getObject(urlArtist).then(function (responce) {
                $scope.Artists = responce.data
            }, function (eror) {

                alert(eror.message);
            });
        }

      
        $scope.insertAlbum = function (album) {
            var urlAlbum = 'http://localhost:8090/api/album';
            album.picture = $scope.file.base64;
            dataService.insertObject(urlAlbum, album).then(function (responce) {
                alert("Success");
            }, function (eror) {

                alert(eror.message);
            });
        }

        $scope.reLoad = function () {
            $scope.searchText = "";
        }


    

        //$scope.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
        //    alert('this is handler for file reader onload event!');
        //};
        
        //function convertImageToDataURI(url, callback, outputFormat) {
        //    var img = new Image();
        //    img.crossOrigin = 'Anonymous';
        //    img.onload = function () {
        //        var canvas = document.createElement('CANVAS'),
        //        ctx = canvas.getContext('2d'), dataURL;
        //        canvas.height = this.height;
        //        canvas.width = this.width;
        //        ctx.drawImage(this, 0, 0);
        //        dataURL = canvas.toDataURL(outputFormat);
        //        callback(dataURL);
        //        canvas = null;
        //    };
        //    img.src = url;
        //}
    }])

    // Path: /login
    .controller('LoginCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'AngularJS SPA | Sign In';
        // TODO: Authorize a user
        $scope.login = function () {
            $location.path('/');
            return false;
        };


       
    }])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';



       
    }]);