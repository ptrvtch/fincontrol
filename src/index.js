angular.module("app", [
    'ngMaterial'
])
    .config(config)
    .run(run);


function config($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple');
}

function run() {
    
}