// Ionic iSkolicka App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index1.html)
// the 2nd parameter is an array of 'requires'

"use strict";

var app = angular.module('iSkolicka', ['ionic', 'lesson']);

app.run(function ($ionicPlatform) {
	$ionicPlatform.ready(function () {
		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		//var portail = false;
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
		//window.addEventListener('deviceorientation', function (event) {
		//	if (window.innerHeight > window.innerWidth) {
		//		if (!portail) {
		//			portail = true;
		//			console.log('Orientation portail');
		//		}
		//	} else {
		//		if (portail) {
		//			portail = false;
		//			console.log('Orientation landscape');
		//		}
		//	}
		//}, false);
	});
});

app.controller('LoginCtrl', function ($scope, $location) {
		$scope.user = {};
		$scope.user.loggedUser = localStorage.loggedUser;

		$scope.logout = function () {
			$scope.user.loggedUser = '';
			$scope.user.userToLog = '';
			localStorage.loggedUser = '';
		};

		$scope.lessons = function () {
			$location.path('/lessons');
		};

		$scope.user.userToLog = '';

		$scope.logUser = function () {
			if ($scope.user.userToLog) {
				$scope.user.loggedUser = $scope.user.userToLog;
				localStorage.loggedUser = $scope.user.userToLog;
			}
		};
	}
);

app.controller('BackCtrl', function ($scope, $state, $ionicActionSheet, LessonState) {
		$scope.goBack = function () {
			if (LessonState.totalCorrect() > 0) {
				$ionicActionSheet.show({
					titleText: 'Pokud se vrátite, přijdete o vyplněná slovíčka',
					destructiveText: 'Zpět na seznam',
					cancelText: 'Zrušit',
					destructiveButtonClicked: function () {
						$state.go('lessonsList');
					}
				});
			} else {
				$state.go('lessonsList');
			}
		};
	}
);

app.controller('LessonCtrl', function ($scope, $stateParams, LessonState) {

		var inSpeach = false;

		$scope.name = $stateParams.name;
		LessonState.loadData($stateParams.id, function (data) {
			$scope.items = data;
		});
		$scope.sayIt = function (text) {
			if(inSpeach)
				return;
			text = text.trim();

			responsiveVoice.speak(text, 'US English Female', {
				onstart: function () {
					inSpeach = true;
					console.log('Starting speach');
					console.log('Say word ' + text);
				},
				onend: function () {
					inSpeach = false;
					console.log('Stoping sppech');
				}
			});
		};
	}
);

app.controller('LessonsListCtrl', function ($scope, $state, Lesson, LessonState) {

		var isLoading = false;

		Lesson.list(function (data) {
			$scope.items = data;
		});
		$scope.goLogin = function () {
			$state.go('login');
		};

		$scope.selectLesson = function (id) {
			if (isLoading) {
				console.log('Double load');
				return;
			}
			isLoading = true;
			LessonState.loadData(id, function (data) {
				isLoading = false;
				$state.go('tab.lesson', {
					id: id
				});
			});

		}
	}
);

app.controller('TestCtrl', function ($scope, LessonState) {

	$scope.lesson = LessonState;
});

app.controller('ResultsCtrl', function ($scope, LessonState) {

	$scope.lessonState = LessonState;

});

app.config(function ($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	// Each tab has its own nav history stack:
	//.state('index', {
	//	url: "/",
	//	abstract : true,
	//	templateUrl: "index.html",
	//	controller: 'TadoCtrl'
	//})
		.state('login', {
			url: '/login',
			templateUrl: 'login.html',
			controller: 'LoginCtrl'
		})
		.state('lessonsList', {
			url: '/lessons',
			templateUrl: 'lessonList.html',
			controller: 'LessonsListCtrl'
		})
		.state('tab', {
			url: "/tab",
			abstract: true,
			templateUrl: "tabs.html"
		})
		.state('tab.lesson', {
			url: '/lesson/:id',
			views: {
				'tab-lesson': {
					templateUrl: 'lesson.html',
					controller: 'LessonCtrl'
				}
			},
			onEnter: function (LessonState) {
				LessonState.addHint();
			}
		})
		.state('tab.test', {
			url: '/test',
			views: {
				'tab-test': {
					templateUrl: 'test.html',
					controller: 'TestCtrl'
				}
			}
		})
		.state('tab.results', {
			url: '/results',
			views: {
				'tab-results': {
					templateUrl: 'results.html',
					controller: 'ResultsCtrl'
				}
			}
		})
	;
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');
});
