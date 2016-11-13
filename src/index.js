angular.module("app", [
    'templates',
    'ui.router',
    'firebase',
    'ngMaterial'
])
    .config(config)
    .run(run);


function config($locationProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true).hashPrefix('');
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
        url: '/',
        component: 'main'
    });
}

function run() {
    
}