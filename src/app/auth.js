angular.module('app')
.factory('auth', auth);

function auth($log, $http) {
    $log.info('auth loaded!');

    return {
        
    }
}