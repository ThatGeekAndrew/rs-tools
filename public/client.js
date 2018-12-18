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
      $scope.hiscoreType = 'normal';

      $scope.setVersion = function(vers) {
        $scope.gameVersion = vers;
      }

      $scope.queryRunescape = function(rsn) {
        if (rsn) {
          $scope.querying = true;
          $scope.highscores = null;
          $scope.lookedup = rsn;

          switch ($scope.gameVersion) {
            case 'rs':
              apiService.rs(rsn).then(resp => {
                handleResponse(resp);
              }).finally(function() {
                $scope.querying = false;
              });
              break;

            case 'osrs':
              apiService.osrs(rsn).then(resp => {
                handleResponse(resp);
              }).finally(function() {
                $scope.querying = false;
              });
              break;
          
            default:
              break;
          }
        }
      }

      function handleResponse(resp) {
        var skills = [];
  
        angular.forEach(resp.data.skills, function(value, key) {
          var skill = {
            name: key,
            ...value
          };
          
          this.push(skill);
  
        }, skills);
  
        $scope.highscores = { version: $scope.gameVersion, ...skills };
      }

    }
  ])
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
})