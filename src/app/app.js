angular.module('app')
    .controller('testCtrl', testCtrl);
/*@ngInject*/
function testCtrl() {
    console.log('testCtrl')
    var vm = this;
    this.hello = 'world';
}  