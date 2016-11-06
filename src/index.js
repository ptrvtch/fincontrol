angular.module("app", [])
    .config([function () {
        console.log("app:config");
    }])
    .run([function () {
        console.log("app:run");
    }])
    .controller("testCtrl", ["$scope", function ($scope) {
        console.log("testCtrl:BarCtrl");
        $scope.foo = "bar";
    }])
    ;
console.log('the script actaully works');