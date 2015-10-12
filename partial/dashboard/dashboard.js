angular.module('vfaDashboard').controller('DashboardCtrl', function($scope, vfaSalesforce){
  $scope.selectedCompany;

  // angular promise -- look it up
  // vfaSalesforce.getCompanies().then(function(data) {
  //   $scope.companies = data;
  // });

  $scope.companies = vfaSalesforce.getCompanies();

  $scope.$watch(scope, 'companies', function(old, new) {
    // vfaSalesforce.getCompanyInfo().then(function(data) {
    //   $scope.comapnyInfo = data;
    // });
  });

});
