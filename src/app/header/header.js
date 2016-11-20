angular.module('app')
    .component('header', {
        templateUrl: 'app/header/header.tpl.html',
        controller: 'headerCtrl as vm'
    })
    .controller('headerCtrl', headerCtrl);

function headerCtrl($log, $mdDialog, auth, db, $scope) {
    var vm = this;
    vm.getUser = auth.getUser;

    vm.openSignin = function (ev) {
        $log.info('openSignin modal opened', ev);
        $mdDialog.show({
            controller: 'authCtrl as vm',
            templateUrl: 'app/auth/auth.tpl.html',
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                vm.status = 'You said the information was "' + answer + '".';
                $mdDialog.hide(answer);
            }, function () {
                vm.status = 'You cancelled the dialog.';
            });
    };

    vm.openSignout = function (ev) {
        $log.info('openSignout modal opened');
        var confirm = $mdDialog.confirm()
            .title('Sign out')
            .textContent('You are about to sign out. Are you sure?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Sign out')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function () {
            auth.signOut();
        }, function () {
            $scope.status = 'You decided to keep your debt.';
        });
    };

    vm.openIncomeModal = function (ev) {
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

}