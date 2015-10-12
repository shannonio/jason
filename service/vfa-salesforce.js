angular.module('vfaDashboard').factory('vfaSalesforce',function($http) {
  return {
    auth: function() {
      // var url = '/';
      // var data = {};
      // return $http.get(url, data).then(function(response) {
      //   return response.data;
      // });
    },
    getCompanies: function() {
      return [
        {name: 'the best company ever'},
        {name: 'jfdksalfjdsafdsa'},
        {name: 'asdgagfdg'},
        {name: 'asdfadgtrhfsg'}
      ]
    },
    getCompanyInfo: function() {
      return [
        {
          funding_type: 'foo',
          funding_amount: '1 billion'
        }
      ]
    }
  }
});
