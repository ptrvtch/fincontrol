firebase.initializeApp({
    apiKey: "AIzaSyD0P31Pi_HdRSCp0f2yQuKZD2C-KmYS7GU",
    authDomain: "fincontrol-6f11a.firebaseapp.com",
    databaseURL: "https://fincontrol-6f11a.firebaseio.com",
    storageBucket: "fincontrol-6f11a.appspot.com",
    messagingSenderId: "916230721775"
});

angular.module("app", [
    'templates',
    'ui.router',
    'firebase',
    'ngMaterial'
])
    .config(config)
    .run(run);


function config($locationProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider, $mdIconProvider) {
    $locationProvider.html5Mode(true).hashPrefix('');
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('main', {
        url: '/',
        component: 'main'
    });
    $mdIconProvider.defaultIconSet('img/mdi.svg')
}

function run($log, $firebaseAuth) {
    $log.info('Loaded successfully at ' + new Date().toLocaleString('ru'));
    var user = $firebaseAuth().$getAuth();

    if (user) {
        $log.info("Signed in as:", user.uid);
    } else {
        $log.info("Not signed in");
    }
}