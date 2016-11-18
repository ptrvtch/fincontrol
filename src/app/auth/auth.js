angular.module('app')
    .factory('auth', auth)
    .controller('authCtrl', authCtrl);

function auth($log, $http) {
    $log.info('auth service loaded!');

    return {

    }
}

function authCtrl($log, $mdDialog) {
    $log.info('authCtrl loaded!');
    var vm = this;
    vm.google = function() {
        $log.info('google login');
    }
    vm.facebook = function() {
        $log.info('facebook login');
    }
    vm.cancel = function() {
        $mdDialog.cancel('cancel button');
    }
}