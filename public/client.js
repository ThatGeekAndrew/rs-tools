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

      $scope.callAPI = function(rsn) {
        $scope.querying = true;

        if (rsn && rsn != $scope.lookedup) {

          $scope.highscores = null;
          $scope.lookedup = rsn;

          dataService.get(rsn).then(
            function(resp) {
              console.log(resp);
              
              var skills = [];

              angular.forEach(resp.data.Skills, function(value, key) {
                var skill = {};

                skill.name = key;

                skill = {...skill, ...value};
                
                this.push(skill);

              }, skills);

              $scope.highscores = skills;
            }
          ); // end dataService
          
        } else {
          if (rsn) {
            console.log('this dipshit is trying to spam the lookup button');
          } else {
            console.log('this dipshit is trying to lookup no one');
          }
        }

        $scope.querying = false;
      }
      
    }
  ])