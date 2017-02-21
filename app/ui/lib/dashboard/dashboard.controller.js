/**
 * Created by enpfeff on 2/20/17.
 */

function controller() {
    'ngInject';
    let dash = this;

    _.extend(dash, {
        openMenu
    });

    function openMenu($mdMenu, $event){
        $mdMenu.open($event);
    }
}

module.exports = controller;