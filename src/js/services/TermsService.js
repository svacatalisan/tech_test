var angular = require('angular');

angular.module('myApp')
	.factory('TermsService', TermsService);

function TermsService(DAL) {
	const baseUrl = 'http://localhost:8080/src/js/data/terms.json';
	const returnObj = {};

	returnObj.getTermsAndConditions = function() {
		return DAL.get(baseUrl);
	};

	return returnObj;
}