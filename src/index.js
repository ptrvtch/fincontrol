angular.module("app", [
    'ui.router',
    'firebase',
    'ngMaterial',
    'templateCache'
])
    .config(config)
    .run(run);


function config($locationProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
        url: '/',
        controller: 'testCtrl as vm',
        templateUrl: 'app/app.html'
    });
}

function run() {
    
}