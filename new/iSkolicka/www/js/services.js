/**
 * Created by pavel on 16.03.15.
 */

(function closure() {

	var module = angular.module('lesson', ['ionic']);

	var lesssonListUrl = 'http://mobile.iskolicka.cz/script/lesson';
	var lessonUrl = 'http://mobile.iskolicka.cz/script/dictionary/';

	/**
	 * Service Lesson is ised to cumunicate with server to load lesson list and
	 * each individual lesson
	 */
	module.factory('Lesson', function ($http) {
		return {
			/**
			 * Load lesson list from server
			 * @param callback
			 */
			list: function (callback) {
				if (!callback) {
					throw new Error('Missing callback');
				}
				$http.get(lesssonListUrl)
					.success(function(data, status, headers, config) {
						var items = [];
						data.sort(function (a, b) {
							return parseInt(a.firstName) - parseInt(b.firstName);
						});
						data.forEach(function (x) {
							var item = x.firstName + ' - ' + x.lastName;
							var rec = {
								text : item,
								index: x.firstName
							};
							items.push(rec);
						});
						callback(items);
					})
					.error(function(data, status, headers, config) {
						console.log('Cannot read lesson list - status ' + status);
						callback([{text: 'Chyba komunikace - ' + status}]);
					});
			},
			/**
			 * Read each individual lesson from server
			 * @param id id of loaded lesson
			 * @param callback
			 */
			get : function (id, callback) {
				$http.get(lessonUrl + id)
					.success(function (data, status, headers, config) {
						var items = [];
						if (data !== 'null') {
							data.forEach(function (x) {
								items.push(x);
							});
						}
						callback(items);
					})
					.error(function(data, status, headers, config) {
						console.log('Cannot read lesson ' + id + ' - status ' + status);
						callback([]);
					});
			}
		}
	});
	/**
	 * Service LessonState holds state of current test lesson
	 */
	module.factory('LessonState', function ($q, Lesson) {
		var currentIndex = 0;
		var lessonId = -1;
		var noOfHits = -1;
		var data = [];

		var reset = function() {
			lessonId = -1;
			currentIndex = 0;
			noOfHits = -1;
			data = [];
		};

		var setData = function (newData, newLessonId) {
			lessonId = newLessonId;
			if (newData) {
				newData.forEach(function (item) {
					var x = {
						cz  : item.cz,
						en  : item.en,
						user: ''
					};
					data.push(x);
				});
			}
		};

		var iterator = function (callback) {
			callback = callback || function () {};
			for (var i = 0; i < data.length; i++) {
				callback(i);
			}
		};

		var correct = function (index) {

			if (index < 0 || index >= data.length) {
				return false;
			}
			return data[index].en.trim().toUpperCase() == data[index].user.trim().toUpperCase();
		};

		var empty = function (index) {

			if (index < 0 || index >= data.length) {
				return false;
			}
			return !data[index].user.trim();
		};

		return {

			loadData: function (newLessonId, callback) {
				reset();

				Lesson.get(newLessonId, function (newData) {
					setData(newData, newLessonId);
					callback(data);
				});
			},

			getData: function() {
				return data;
			},

			id: function () {
				return lessonId;
			},

			addHint: function () {
				noOfHits++;
			},

			previous: function () {
				if (currentIndex > 0) {
					currentIndex--;
				}
			},

			next: function () {
				if (currentIndex < data.length - 1) {
					currentIndex++;
				}
			},

			isCorrect: function() {
				if(data.length <= currentIndex)
					return false;
				return correct(currentIndex);
			},

			getCurrent: function () {
				if(data.length > currentIndex)
					return data[currentIndex].cz;
				return '';
			},

			get result() {
				if(data.length > currentIndex)
					return data[currentIndex].user;
				return '';
			},

			set result(newVal) {
				data[currentIndex].user = newVal;
			},

			totallHints: function () {
				return noOfHits;
			},

			totalTotal: function() {
				return data.length;
			},

			totalCorrect: function () {
				var count = 0;
				iterator(function (i) {
					if (correct(i)) {
						count++;
					}
				});
				return count;
			},

			totalError: function () {
				var count = 0;
				iterator(function (i) {
					if (empty(i)) {
						return;
					}
					if (!correct(i)) {
						count++;
					}
				});
				return count;
			},

			totalEmpty: function () {
				var count = 0;
				iterator(function (i) {
					if (empty(i)) {
						count++;
					}
				});
				return count;
			},

			isFirst : function() {
				return currentIndex == 0;
			},

			isLast: function() {
				return currentIndex >= data.length - 1;
			}

		};
	});
})();
