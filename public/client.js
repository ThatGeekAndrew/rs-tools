angular
  .module('rsTools', [])
  .config(function() {})
  .service('apiService', [
    '$http',
    function($http) {
      this.osrs = function(route) {
        return $http.get('/api/osrs/hiscores/' + route);
      }

      this.rs = function(route) {
        return $http.get('/api/rs/hiscores/' + route);
      }
    }
  ])
  .controller('RSLookupController', [
    '$scope', 'apiService',
    function RSLookupController($scope, apiService) {
      // to do: get prefrences from url structure or localstorage
      $scope.gameVersion = 'osrs';
      $scope.hiscoreType = '';

      $scope.setVersion = function(vers) {
        $scope.gameVersion = vers;
      }

      $scope.queryRunescape = function(rsn) {
        if (rsn) {
          $scope.querying = true;
          $scope.hiscore = null;
          $scope.error = null;
          $scope.lookedup = rsn;

          if($scope.hiscoreType) {
            rsn = rsn + '/' + $scope.hiscoreType;
          }

          switch ($scope.gameVersion) {
            case 'rs':
              apiService.rs(rsn).then(resp => {
                handleResponse(resp);
              }).catch(error => {
                handleError(error);
              }).finally(function() {
                $scope.querying = false;
              });
              break;

            case 'osrs':
              apiService.osrs(rsn).then(resp => {
                handleResponse(resp);
              }).catch(error => {
                handleError(error);
              }).finally(function() {
                $scope.querying = false;
              });
              break;
          
            default:
              break;
          }
        }
      }

      function handleError(error) {
        // console.log('error');
        console.log(error.data.error);
        $scope.error = error.data.error;
      }

      function handleResponse(resp) {
        // console.log('success');
        console.log(resp);
        var skills = [];
        var activities = [];
  
        /** Successful resp.data object
         * {
         *  skills: { ... },
         *  activities: { ... },
         *  ...
         * }
         */

        angular.forEach(resp.data.skills, function(value, key) {
          var skill = {
            name: key,
            ...value
          };
          
          this.push(skill);
  
        }, skills);

        angular.forEach(resp.data.activities, function(value, key) {
          var activity = {
            name: key,
            ...value
          };
          
          this.push(activity);
  
        }, activities);
  
        $scope.hiscore = {
          rsn: $scope.lookedup,
          version: $scope.gameVersion,
          type: $scope.hiscoreType,
          skills: skills,
          activities: activities
        };
      }
    }
  ])
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})