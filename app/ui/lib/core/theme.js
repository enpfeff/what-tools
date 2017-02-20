/**
 * Created by enpfeff on 2/20/17.
 */

module.exports = theme;

function theme($mdThemingProvider) {
    'ngInject';

    $mdThemingProvider.theme('altTheme')
        .primaryPalette('grey',{'default': '900'})
        .accentPalette('grey',{'default': '700'})
        .dark();


    $mdThemingProvider.theme('default').dark();
    $mdThemingProvider.setDefaultTheme('altTheme');
    $mdThemingProvider.alwaysWatchTheme(true);
}