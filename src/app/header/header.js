angular.module('app')
    .component('header', {
        templateUrl: 'app/header/header.tpl.html',
        controller: 'headerCtrl as vm'
    })
    .controller('headerCtrl', headerCtrl);

function headerCtrl($log, $mdDialog, auth, $scope) {
    $log.info('headerCtrl loaded!');
    var vm = this;
    vm.getUser = auth.getUser;
    $log.info('user is: ' + vm.user)

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
    }
}