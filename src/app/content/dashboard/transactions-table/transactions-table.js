angular.module('app')
    .component('transactionsTable', {
        templateUrl: 'app/content/dashboard/transactions-table/transactions-table.tpl.html',
        controller: 'transactionsTableCtrl as vm'
    })
    .controller('transactionsTableCtrl', transactionsTableCtrl);

function transactionsTableCtrl($log, $state, $scope, auth, db) {
    var vm = this;

    vm.getTransactions = db.getTransactions;

    vm.test = vm.getTransactions();

}