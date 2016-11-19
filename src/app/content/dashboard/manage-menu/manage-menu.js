angular.module('app')
    .component('manageMenu', {
        templateUrl: 'app/content/dashboard/manage-menu/manage-menu.tpl.html',
        controller: 'manageMenuCtrl as vm'
    })
    .controller('manageMenuCtrl', manageMenuCtrl);

function manageMenuCtrl($log, $state, $scope, $mdDialog, auth, db) {
    var vm = this;
    $log.info('manageMenuCtrl activated');
    vm.accounts = db.getAccounts();

    vm.openIncomeModal = function (ev) {
        
        vm.income = {
            type: "income"
        };
        $mdDialog
            .show({
                controller: 'manageMenuCtrl as vm',
                templateUrl: 'app/content/dashboard/manage-menu/addIncome.tpl.html',
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

    vm.cancelModal = function () {
        $mdDialog.cancel();
    }

    vm.addIncome = function () {
        $log.debug(vm.income);
    }

}