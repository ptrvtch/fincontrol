angular.module('app')
    .component('budgetBar', {
        templateUrl: 'app/content/dashboard/budget-bar/budget-bar.tpl.html',
        controller: 'budgetBarCtrl as vm'
    })
    .controller('budgetBarCtrl', budgetBarCtrl);

function budgetBarCtrl(db, $log, $scope) {
    var vm = this;
    $scope.$on('transactions', function () {
        vm.loaded = true;
        vm.transactions = db.getTransactions();
    });

    vm.getMonthlyBudget = function () {
        if (!vm.transactions) return 0;

        return vm.transactions.reduce(function (total, val) {
            if (!val.isExpense) {
                return total + val.amount;
            } else {
                return total - val.amount;
            }
        }, 0);
    };

    vm.getWeeklyBudget = function () {
        if (!vm.transactions) return 0;
        var curr = new Date(); // get current date
        curr.setHours(0,0,0,0,0);
        var weekDay = (curr.getDay() == 0)? 6 : curr.getDay() - 1;
        var first = curr.getDate() - weekDay; 
        var last = first + 6; // last day is the first day + 6

        var firstday = new Date(curr.setDate(first));
        var lastday = new Date(curr.setDate(last));

        var initialWeeklyBudget = vm.getMonthlyBudget() / 4;

        var weeklySpendings = vm.transactions.reduce(function(sum, val) {
            var currDate = new Date(val.date);
            if ((currDate >= firstday) && (currDate <= lastday) && val.isExpense) {
                return sum + val.amount;
            } else {
                return sum;
            }
        }, 0);
        return initialWeeklyBudget - weeklySpendings;
    };

    vm.getDailyBudget = function() {
        if (!vm.transactions) return 0;
        var curr = new Date();
        curr.setHours(0,0,0,0,0);
        var currDay = curr.getDate();
        var totalDays = new Date(curr.getFullYear(), curr.getMonth()+1, 0).getDate();
        $log.info(currDay, totalDays);


        return vm.getMonthlyBudget() / totalDays;

        // var spendings = vm.transactions.reduce(function(sum, val) {
        //     var date = new Date(val.date);
        //     if ((date <= curr) && val.isExpense) {
        //         return sum + val.amount;
        //     } else {
        //         return sum;
        //     }
        // }, 0);
        // return dailyBudget - spendings;

    };

}