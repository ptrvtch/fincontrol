angular.module("app", [])
    .config(config)
    .run(run);


function config($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple');
}

function run() {
    console.info('run')
}