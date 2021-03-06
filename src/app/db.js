angular.module('app')
    .factory('db', db);

function db($log, $firebaseObject, $firebaseArray, auth, $rootScope, $mdToast) {
    $log.info('db service loaded');
    var userRef, accountsRef,
        $user, $accounts,
        $incomeCategories, $expenseCategories,
        $transactions;

    var defAccounts = [
        'Cash',
        'CreditCard'
    ];

    var defIncomeCategories = [
        'Salary',
        'Gift',
        'Other'
    ];

    var defExpenseCategories = [
        'Food',
        'Eat out',
        'Home',
        'Medicine',
        'Sport and health',
        'Gift',
        'Communication',
        'Entertainment',
        'Education',
        'WTF',
        'Other'
    ];

    function connect() {
        var uid = auth.getUser().uid;
        $log.info('uid is ', uid);
        userRef = firebase.database().ref('users/' + uid);
        accountsRef = userRef.child('accounts');
        $firebaseObject(userRef).$loaded(function (data) {
            $user = data;
        });

        // populate default accounts
        $firebaseArray(accountsRef).$loaded(function (data) {
            $accounts = data;
            if ($accounts.length == 0) {
                defAccounts.forEach(function (acc) {
                    $accounts.$add(acc);
                });
                $accounts.$save().then(function () {
                    $log.debug($accounts);
                });
            }
        });

        //populate default income categories
        $firebaseArray(userRef.child('incomeCategories')).$loaded(function (data) {
            $incomeCategories = data;
            if ($incomeCategories.length == 0) {
                defIncomeCategories.forEach(function (cat) {
                    $incomeCategories.$add(cat);
                });
                $incomeCategories.$save().then(function () {
                });
            }
        });

        //populate default expense categories
        $firebaseArray(userRef.child('expenseCategories')).$loaded(function (data) {
            $expenseCategories = data;
            if ($expenseCategories.length == 0) {
                defExpenseCategories.forEach(function (cat) {
                    $expenseCategories.$add(cat);
                });
                $expenseCategories.$save().then(function () {
                });
            }
        });

        //populate transactions
        $firebaseArray(userRef.child('transactions')).$loaded(function(data) {
            $transactions = data;
            $rootScope.$broadcast('transactions');
        });
        $firebaseArray(userRef.child('transactions')).$watch(function() {
            $rootScope.$broadcast('transactionsUpdate');
        });
    }

    function getAccounts() {
        return $accounts;
    }

    function getIncomeCategories() {
        return $incomeCategories;
    }

    function getExpenseCategories() {
        return $expenseCategories;
    }

    function getTransactions() {
        return $transactions;
    }

    function loadTransactions() {
        return $firebaseArray(userRef.child('transactions')).$loaded();
    }

    function addTransaction(transaction) {
        $firebaseArray(userRef.child('transactions'))
            .$add(transaction)
            .then(function(data){
                $log.info('transaction added!', data);
                $rootScope.$broadcast('transactionsUpdate');
            });
    }


    return {
        connect: connect,
        getAccounts: getAccounts,
        getIncomeCategories: getIncomeCategories,
        getExpenseCategories: getExpenseCategories,
        addTransaction: addTransaction,
        getTransactions: getTransactions,
        loadTransactions: loadTransactions
    };
} 