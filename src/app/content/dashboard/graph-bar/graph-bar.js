angular.module('app')
    .component('graphBar', {
        templateUrl: 'app/content/dashboard/graph-bar/graph-bar.tpl.html',
        controller: 'graphBarCtrl as vm'
    })
    .controller('graphBarCtrl', graphBarCtrl);

function graphBarCtrl($log, $state, $scope, db) {
    var vm = this;

    function makeChart(type) {
        var chart = {
            data: [],
            labels: []
        };

        vm.transactions.forEach(function (elem) {
            var isExpense;
            if (type == 'expense') {
                isExpense = elem.isExpense;
            } else if(type == 'income') {
                isExpense = !elem.isExpense;
            }
            if (!isExpense) return;
            var index = chart.labels.indexOf(elem.catId);
            if (index == -1) {
                chart.labels.push(elem.catId);
                chart.data.push(elem.amount);
            } else {
                chart.data[index] += elem.amount;
            }
        });

        return chart;

    }

    $scope.$on('transactions', function () {
        vm.loaded = true;
        vm.transactions = db.getTransactions();

        vm.incomeChart = makeChart('income');
        vm.expenseChart = makeChart('expense');
        $log.info(vm.incomeChart, vm.expenseChart);
    });
    
    $scope.$on('transactionsUpdate', function() {
        if (!vm.transactions) return;
        $log.info('time to update graphs');
        vm.incomeChart = makeChart('income');
        vm.expenseChart = makeChart('expense');

    })


}