angular.module('app')
    .factory('db', db);

function db($log, $firebaseObject, $firebaseArray, auth) {
    $log.info('db service loaded');
    var userRef,
        user;

    function connect() {
        var uid = auth.getUser().uid;
        $log.info('uid is ', uid);
        userRef = firebase.database().ref('users/' + uid);
        user = $firebaseObject(userRef);
        $log.info(user);
        user.foo = "bar";
        user.$save();
    }

    // var userRef = firebase.database().ref('users/' + uid);
    // var user = $firebaseObject(userRef);
    // var asscns = $firebaseArray(associationsRef);

    return {
        connect: connect
    }
} 