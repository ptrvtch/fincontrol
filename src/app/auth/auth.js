angular.module('app')
    .factory('auth', auth)
    .controller('authCtrl', authCtrl);

function auth($log, $firebaseAuth, $rootScope) {
    $log.info('auth service loaded!');
    var authObj = $firebaseAuth();
    var userData = $rootScope.user;
    $rootScope.$watch("user", function (nVal, oVal) {
        userData = $rootScope.user;
        $log.info("watcher fired");
    })

    function loginWithGoogle() {
        return authObj.$signInWithPopup("google").then(function (result) {
            $log.info('Signed in as ' + result.user.email);
            return result;
        }, function (error) {
            $log.debug('Authentication failed: ' + error);
            return error
        })
    }

    function getUser() {
        return $rootScope.user;
    }

    function signOut() {
        return authObj.$signOut().then(function (result) {
            $log.info('successfully logged out')
        }, function (error) {
            $log.debug('error logging out: ' + error)
        })
    }

    return {
        loginWithGoogle: loginWithGoogle,
        signOut: signOut,
        getUser: getUser
    }
}

function authCtrl($log, $mdDialog, auth, $firebaseAuth) {
    $log.info('authCtrl loaded!');
    var vm = this;
    vm.google = function () {
        auth.loginWithGoogle().then(function (result) {
            $log.info('authCtrl got from auth: ' + result);
            $log.info($firebaseAuth().$getAuth());
            $mdDialog.hide(result);
        }, function (error) {
            $log.info('authCtrl got error from auth' + error);
            return error
        })
    }
    vm.facebook = function () {
        $log.info('facebook login');
    }
    vm.cancel = function () {
        $mdDialog.cancel('cancel button');
    }
}