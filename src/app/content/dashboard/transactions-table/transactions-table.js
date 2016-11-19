angular.module('app')
    .component('paymentsTable', {
        templateUrl: 'app/content/dashboard/payments-table/payments-table.tpl.html',
        controller: 'paymentsTableCtrl as vm'
    })
    .controller('paymentsTableCtrl', manageMenuCtrl);

function paymentsTableCtrl($log, $state, $scope, auth) {
    var vm = this;
    $log.info('paymentsTableCtrl activated');
}