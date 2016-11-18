angular.module('app')
    .component('header', {
        templateUrl: 'app/header/header.tpl.html',
        controller: 'headerCtrl as vm'
    })
    .controller('headerCtrl', headerCtrl);

function headerCtrl($log, $mdDialog) {
    $log.info('headerCtrl loaded!');
    var vm = this;
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
            }, function () {
                vm.status = 'You cancelled the dialog.';
            });
    }
}