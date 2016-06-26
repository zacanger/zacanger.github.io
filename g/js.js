var app = angular.module('githubSearch', ['ui.router'])

app.config(['$stateProvider', '$urlRouterProvider',
function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/')
  $stateProvider
  .state('home', {
    url         : '/'
  , template    : '<h1>github search</h1><form ng-submit="search()" role="form"><input type="text" autofocus ng-model="query"><input type="submit" value="?"></form>'
  , controller  : 'HomeCtrl'
  })
  .state('search', {
    url         : '/search/:query'
  , templateUrl : './results.html'
  , controller  : 'SearchCtrl'
  })
}])

app.controller('HomeCtrl', [
  '$scope', '$state', '$location',
  function ($scope, $state, $location) {
  $scope.query = ''
  $scope.search = function () {
    if ($scope.query !== '') {
      $location.path('search/' + $scope.query)
    }
  }
}])


app.controller('SearchCtrl', [
  '$scope', '$stateParams', '$location', 'GitSearcher',
  function ($scope, $stateParams, $location, GitSearcher) {
  $scope.query = $stateParams.query
  if ($scope.query === '')
    $location.path('/')
  $scope.metadata = {}
  $scope.results  = []
  var searched = function (data) {
    $scope.metadata.count = data.total_count
    $scope.results = data.items
  }
  var failed = function () {}
  GitSearcher.get($scope.query, searched, failed)
  $scope.search = function () {
    if ($scope.query !== '') {
      $location.path('search/' + $scope.query)
    }
  }
}])

app.factory('GitSearcher', ['$http',
function ($http) {
  var baseUrl = 'https://api.github.com/search/repositories?q='
  return {
    get: function (query, success, error) {
      $http.get(baseUrl + query).success(success).error(error)
    }
  }
}])

