angular.module('app')
    .component('budgetBar', {
        templateUrl: 'app/content/dashboard/budget-bar/budget-bar.tpl.html',
        controller: 'budgetBarCtrl as vm'
    })
    .controller('budgetBarCtrl', budgetBarCtrl);

function budgetBarCtrl() {
    var vm = this;

    
}