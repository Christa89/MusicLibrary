
'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    .controller('HomeCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'AngularJS SPA Template for Visual Studio';

    }])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', 'dataService', '$filter', function ($scope, $location, $window, dataService, $filter) {

        var urlAlbum = 'http://localhost:8090/api/album';
        var urlArtist = 'http://localhost:8090/api/Artist';

        $scope.hide = true;
     

        getalbums(urlAlbum);
        console.log('hai i am fine')
        function getalbums(urlBase) {
            dataService.getObject(urlAlbum).then(function (responce) {
                $scope.albums = responce.data;
                $scope.viewby = 10;
                $scope.totalItems = responce.data.length;
                $scope.currentPage = 1;
                $scope.itemsPerPage = 5;
                $scope.maxSize = 5;

            }, function (eror) {

                alert(eror.message);
            });
        }

        //$scope.$watch("currentPage", function () {
        //    setPagingData($scope.currentPage);
        //});

        //function setPagingData(page) {
        //    var pagedData = $scope.albums.slice(
        //      (page - 1) * $scope.itemsPerPage,
        //      page * $scope.itemsPerPage
        //    );
        //    $scope.albums = pagedData;
        //}

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
        
        $scope.editAlbum = function (album) {
            $scope.album = album;
            $scope.album.Albm_id = album.Albm_id;
            $scope.album.Albm_Name = album.Albm_Name;
            $scope.album.Aritist_id = album.Aritist_id;
            //$scope.album.Artist.Artist_id = album.Aritist_id;
            $scope.album.RelaeseDate = $filter('date')(new Date(album.RelaeseDate), 'yyyy-MM-dd');
            $scope.album.picture = album.picture;
            $scope.hide = false;
        }

        $scope.UpdateAlbum = function () {


        }

        $scope.reLoad = function () {
            $scope.searchText = "";
        }

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