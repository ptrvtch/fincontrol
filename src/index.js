firebase.initializeApp({
    apiKey: 'AIzaSyD0P31Pi_HdRSCp0f2yQuKZD2C-KmYS7GU',
    authDomain: 'fincontrol-6f11a.firebaseapp.com',
    databaseURL: 'https://fincontrol-6f11a.firebaseio.com',
    storageBucket: 'fincontrol-6f11a.appspot.com',
    messagingSenderId: '916230721775'
});

angular.module('app', [
    'templates',
    'ngMessages',
    'ui.router',
    'firebase',
    'ngMaterial',
    'md.data.table',
    'chart.js'
])
    .config(config)
    .run(run);


function config($locationProvider, $mdThemingProvider, $stateProvider, $urlRouterProvider, $mdIconProvider) {
    $locationProvider.html5Mode(true).hashPrefix('');
    $mdThemingProvider
        .theme('default')
        .primaryPalette('green')
        .accentPalette('indigo');


    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('main', {
            url: '',
            component: 'main',
            abstract: true
        })
        .state('main.greeting', {
            url: '/',
            views: {
                'content': {
                    component: 'greeting'
                }
            }
        })
        .state('main.dashboard', {
            url: '/dashboard',
            views: {
                'content': {
                    component: 'dashboard'
                }
            },
            resolve: {
                security: securityFn
            }
        });

    $mdIconProvider.defaultIconSet('img/mdi.svg');
}

function run($log, $firebaseAuth, $rootScope, $state, $firebaseObject, db) {
    $log.info('Loaded successfully at ' + new Date().toLocaleString('ru'));

    $rootScope.$on('$stateChangeStart', securityFn);

    $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
        if (firebaseUser) {
            $rootScope.user = firebaseUser;
            $log.info(firebaseUser);
            db.connect();
            $state.go('main.dashboard');
        } else {
            $log.info('not signed in');
            $state.go('main.greeting');
        }
    });
}

function securityFn($log, auth, $state) {
    $log.info('securityFn');
    if (!auth.getUser()) {
        $log.info('ui-state: not authenticated');
        $state.go('main.greeting');
    }
}