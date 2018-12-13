angular
  .module('testApp', [])
  .config(function() {})
  .service('dataService', [
    '$http',
    function($http) {
      this.get = function(route) {
        return $http.get('/api/hiscores/' + route);
      }
    }
  ])
  .controller('OSRSLookupCtrl', [
    '$scope', 'dataService',
    function OSRSLookupCtrl($scope, dataService) {
      // to do: check local storage for prefrences
      $scope.gameVersion = 'OSRS';
      $scope.serviceType = 'Hiscores';

      $scope.queryRunescape = function(rsn) {
        callAPI(rsn);
      }

      function callAPI(rsn) {
        if (rsn && rsn != $scope.lookedup) {
          $scope.querying = true;
          $scope.highscores = null;
          $scope.lookedup = rsn;

          dataService.get(rsn).then(function(resp) {
              console.log(resp);
              var skills = [];

              angular.forEach(resp.data.Skills, function(value, key) {
                var skill = {
                  name: key,
                  ...value
                };
                
                this.push(skill);

              }, skills);

              $scope.highscores = skills;
            }
          ).finally(function() {
            $scope.querying = false;
          }); // end dataService
        }
      }

    }
  ])