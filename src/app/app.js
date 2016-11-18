angular.module('app')
    .component('main', {
        templateUrl: 'app/app.html',
        controller: 'headerCtrl'
    })
    .controller('headerCtrl', headerCtrl);

function headerCtrl($log) {
    var vm = this;
    $log.info('headerCtrl loaded!');
}