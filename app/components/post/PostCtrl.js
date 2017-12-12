function PostCtrl($scope, $http, $stateParams, $location, constants, $window, $rootScope) {
	var me = $scope;
	me.found = true;
	me.isLoading = true;
	me.fbComments =$location.absUrl();
	var GET = $http({
		method: 'GET',
		url: constants.api.url + '/post/' + $stateParams.postName
	});
	GET.success(function (response) {
		me.article = response ? response : null;
		me.found = true;
		me.isLoading = false;
		me.url = $location.absUrl();
		$rootScope.pageTitle = response.local.ttl;
		$rootScope.pageDesc = response.local.text;
		$rootScope.pageImg = response.type == 'News' ? response.media.img[0] :
			'https://i.ytimg.com/vi/' + response.media.video[0] + '/mqdefault.jpg';
	});
	GET.error(function () {
		me.article = null;
		me.found = false;
		me.isLoading = false;
	});

	$window.scrollTo(0, 0);
}

app.controller('PostCtrl', ['$scope', '$http', '$stateParams', '$location', 'constants', '$window', '$rootScope', PostCtrl]);