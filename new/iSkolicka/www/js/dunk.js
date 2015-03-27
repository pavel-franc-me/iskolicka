/**
 * Created by pavel on 17.03.15.
 */

var dunk = angular.module('dunk', ['ionic']);

dunk.controller('TadoCtrl', ['$scope', '$ionicPopup', '$ionicActionSheet', '$http', 'Lesson',
	function ($scope, $ionicPopup, $ionicActionSheet, $http, Lesson) {

		$scope.myName = 'Betty';

		$scope.onClick = function () {
			console.log('Reload lesson list');
			Lesson.list(function(data) {
				$scope.items = data;
			});

		};

		$scope.appTitle = 'Tado app';
		$scope.title = 'My first great application ';
		$scope.items = [];



		$scope.bottomClick = function () {
			// test action sheet
			$ionicActionSheet.show({
				titleText               : 'Action Sheet',
				cancelText              : 'Cancel',
				destructiveText         : 'Destroy',
				destructiveButtonClicked : function () {
					console.log('Destructive Button was clicked');
					return true;
				}
			});
		};

		$scope.nextClick = function() {
			// test popup alert
			$ionicPopup.alert({
				title : 'Next clicked'
			});
		};
	}
]);
