angular.module('app')
    .factory('db', db);

function db($log, $firebaseObject, $firebaseArray, auth) {
    $log.info('db service loaded');
    var userRef, accountsRef,
        $user, $accounts;

    var defAccounts = [
        'Cash',
        'CreditCard'
    ]

    function connect() {
        var uid = auth.getUser().uid;
        $log.info('uid is ', uid);
        userRef = firebase.database().ref('users/' + uid);
        accountsRef = userRef.child("accounts");
        $firebaseObject(userRef).$loaded(function (data) {
            $user = data;
        });
        $firebaseArray(accountsRef).$loaded(function (data) {
            $accounts = data;
            $log.debug($accounts);
            if ($accounts.length == 0) {
                defAccounts.forEach(function (acc) {
                    $accounts.$add(acc);
                })
                $accounts.$save().then(function () {
                    $log.debug($accounts);
                });
            }
        })
    }

    function getAccounts() {
        return $accounts;
    }

    return {
        connect: connect,
        getAccounts: getAccounts
    }
} 