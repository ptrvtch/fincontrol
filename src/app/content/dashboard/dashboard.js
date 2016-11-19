angular.module('app')
    .component('dashboard', {
        templateUrl: 'app/content/dashboard/dashboard.tpl.html',
        controller: 'dashboardCtrl as vm'
    })
    .controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl($log, $state, $scope, auth) {
    var vm = this;
    vm.getUser = auth.getUser;
    $log.info('dashboardCtrl activated');

}