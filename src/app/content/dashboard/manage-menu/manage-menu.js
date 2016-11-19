angular.module('app')
    .component('manageMenu', {
        templateUrl: 'app/content/dashboard/manage-menu/manage-menu.tpl.html',
        controller: 'manageMenuCtrl as vm'
    })
    .controller('manageMenuCtrl', manageMenuCtrl);

function manageMenuCtrl($log, $state, $scope, $mdDialog, auth, db) {
    var vm = this;
    $log.info('manageMenuCtrl activated');
    vm.getAccounts = db.getAccounts;
    vm.getIncomeCategories = db.getIncomeCategories;
    vm.getExpenseCategories = db.getExpenseCategories;

    vm.openIncomeModal = function (ev) {
        vm.transaction = {};
        vm.setType();
        $mdDialog
            .show({
                controller: 'manageMenuCtrl as vm',
                templateUrl: 'app/content/dashboard/manage-menu/addTransaction.tpl.html',
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function (answer) {
                vm.status = 'Income added: ' + answer;
            }, function () {
                vm.status = 'You cancelled the dialog.';
            });
    };

    vm.setType = function (isExpense) {
        vm.transaction.catId = '';
        if (isExpense) {
            vm.categories = vm.getExpenseCategories();
        } else {
            vm.categories = vm.getIncomeCategories();
        }
    };

    vm.cancelModal = function () {
        $mdDialog.cancel();
    };

    vm.addIncome = function () {
        var dateString = (vm.transaction.date)? vm.transaction.date.toString() : new Date().getTime();
        vm.transaction.date = dateString;
        db.addTransaction(vm.transaction);
        $mdDialog.hide();
    };

}