
'use strict';

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', [])

    // Path: /
    .controller('HomeCtrl', ['$scope', '$location', '$window', 'dataService', function ($scope, $location, $window, dataService) {
        $scope.$root.title = 'AngularJS SPA Template for Visual Studio';
        $scope.hide = true;

        var urlAlbum = 'http://localhost:8090/api/album';
        getalbums(urlAlbum);
        function getalbums(urlBase) {
            dataService.getObject(urlAlbum).then(function (responce) {
                $scope.albums = responce.data;
                //$scope.viewby = 10;
                //$scope.totalItems = responce.data.length;
                //$scope.currentPage = 1;
                //$scope.itemsPerPage = 5;
                //$scope.maxSize = 5;

            }, function (eror) {

                alert(eror.message);
            });
        }

        $scope.SetGrid = function () {

            if ($scope.hide)
            {
                $scope.hide = false;
            }
            else
            {
                $scope.hide = true;
            }
           
        };

    }])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', 'dataService', '$filter', function ($scope, $location, $window, dataService, $filter) {

        var urlAlbum = 'http://localhost:8090/api/album';
        var urlArtist = 'http://localhost:8090/api/Artist';
        $scope.hide = true;
     

        getalbums(urlAlbum);
 
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
                getalbums(urlAlbum);
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

        $scope.UpdateAlbum = function (album) {
            var urlAlbum = 'http://localhost:8090/api/album';
            album.ID = album.Albm_id;
            dataService.updateObject(urlAlbum, album).then(function (response) {
                alert("Success");

                $scope.hide = true;
                $scope.album.Albm_id = ""
                $scope.album.Albm_Name = ""
                $scope.album.RelaeseDate = $filter('date')(new Date(album.RelaeseDate), 'yyyy-MM-dd');
                $scope.album.Aritist_id = ""
                getalbums(urlAlbum);

            }, function (error) {
                alert(eror.message);
            })
        }

        $scope.reLoad = function () {
            $scope.searchText = "";
        }

        $scope.ClearControls = function ClearControls()
        {
            $scope.hide = true;
            $scope.album.Albm_id = ""
            $scope.album.Albm_Name = ""
            $scope.album.RelaeseDate = "";
            $scope.album.Aritist_id = ""
        }

        $scope.deleteAlbum = function (album) {
            var id = album.Albm_id;
            var urlAlbum = 'http://localhost:8090/api/album';
            dataService.deleteObject(urlAlbum, id).then(function (success) {

                alert("Succesfully deleted");
                getalbums(urlAlbum);
            }, function (fail) {

                alert(eror.message);
            })

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