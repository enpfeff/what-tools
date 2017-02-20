/**
 * Created by enpfeff on 2/20/17.
 */
module.exports = service;

function service($mdToast) {
    'ngInject';

    return {
        toast
    };

    function toast(msg) {
        $mdToast.show(
            $mdToast.simple()
                .toastClass('md-toast-what')
                .textContent(msg)
                .position('bottom right')
                .hideDelay(3000)
        );
    }
}