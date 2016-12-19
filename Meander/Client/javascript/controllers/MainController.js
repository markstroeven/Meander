/**
 * Created by Mark Stroeven on 11/28/16.
 */
var application = angular.module('SkeletonApp', ['ngMaterial', 'ngRoute']);
application.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/',{templateUrl:'../templates/home.template.html'})
        .when('/dashboard',{templateUrl:'../templates/dashboard.template.html'})
        .when('/:department',{templateUrl:'../templates/departmentdetail.template.html', controller : 'depController'})
        .otherwise({redirectTo:'/'});
}]);
application.controller('mainController', function($rootScope, $scope, $mdSidenav, $mdDialog){
    $rootScope.departments = [];
   $scope.toggle = function(){
        $mdSidenav('left').toggle();
       console.log("Toggling");
    }
    $scope.showdialogdepartment = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/addDepartment.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    function DialogController($scope, $mdDialog){
        $scope.close = function(){
            $mdDialog.cancel();
        }
        $scope.addDep = function(dep){
            dep.subdepartment = [];
            $rootScope.departments.push(dep);
            $mdDialog.cancel();
        }
    }
}).controller('ToolBarCtrl', function ($scope, $mdSidenav ) {
    $scope.isOpen = function() { return $mdSidenav('left').isOpen(); };
    $scope.toggle = function() { $mdSidenav('left').toggle() };
}).controller('depController', function($rootScope, $scope, $mdDialog, $routeParams){
    $rootScope.department = findDepartmentByName($routeParams.department);
    function findDepartmentByName(name){
        for(var i = 0; i < $rootScope.departments.length; i++){
            if($rootScope.departments[i].name == name){
                return $rootScope.departments[i];
            }
        }
    }
    $scope.showdialogsubdepartment = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'templates/addSubDepartment.template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    function DialogController($scope, $mdDialog){
        $scope.close = function(){
            $mdDialog.cancel();
        }
        $scope.addSubDep = function(dep){
            $rootScope.department.subdepartment.push(dep);
            $mdDialog.cancel();
        }
    }
});
