angular.module('vfaDashboard', ['ui.utils','ui.router']);

angular.module('vfaDashboard').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: 'partial/dashboard/dashboard.html'
    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/home');

});

angular.module('vfaDashboard').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
