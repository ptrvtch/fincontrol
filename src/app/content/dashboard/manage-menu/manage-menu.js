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

        vm.transaction = {
            type: "income"
        };
        $mdDialog
            .show({
                controller: 'manageMenuCtrl as vm',
                templateUrl: 'app/content/dashboard/manage-menu/addTransaction.tpl.html',
                targetEvent: ev,
                clickOutsideToClose: true
            })
            .then(function (answer) {
                vm.status = 'Income added: ' + answer;
                $mdDialog.hide(answer);
            }, function () {
                vm.status = 'You cancelled the dialog.'; 
            });
    }

    vm.setType = function(isExpense) {
        vm.transaction.catId = '';
        if (isExpense) {
            vm.categories = vm.getExpenseCategories()
        } else {
            vm.categories = vm.getIncomeCategories()
        }
    };

    vm.cancelModal = function () {
        $mdDialog.cancel();
    }

    vm.addIncome = function () {
        db.addTransaction(vm.transaction);
    }

}