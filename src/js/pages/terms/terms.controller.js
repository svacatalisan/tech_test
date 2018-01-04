var angular = require('angular');

angular.module('myApp')
	.controller('TermsController', function(TermsService, $log, $sce) {
		const vm = this;

    vm.$onInit = function() {
      vm.terms = [];
      vm.termsAndConditions = '';
      getTermsAndConditions();
    }

    function getTermsAndConditions() {
      TermsService.getTermsAndConditions()
        .then(handleTermsSuccess)
        .catch(handleErrorResponse);
    }

    function handleTermsSuccess(response) {
        vm.terms = response.data;
        vm.termsAndConditions = $sce.trustAsHtml(buildTermsFromJSON(vm.terms));
    }

    function handleErrorResponse(error) {
        $log.log(error);
    }

    function buildTermsFromJSON(terms) {
      return Object.keys(terms).map((key) => {
        if (terms[key].constructor === Array) {
          return parseArrayNode(terms[key]);
        }
        return parseObjectNode(terms[key], key);
      }).join('');
    }

    function parseObjectNode(node, key) {
      if (node.constructor === String) {
          return '<p class="' + key + '">' + node + '</p>';
      }
      return Object.keys(node).map((key) => {
        if (node[key].constructor === String) {
            return '<p class="' + key + '">' + node[key] + '</p>';
        }

        if (node[key].constructor === Array) {
          let partial = '<div class=' + key + '>';
          partial += parseArrayNode(node[key], key);
          partial += '</div>';
          return partial;
        }

        if (node[key].constructor === Object){
          return parseObjectNode(node[key], key);
        }
      }).join('');
    }

    function parseArrayNode(node, key) {
      return node.map((item)=>{
        return parseObjectNode(item, key);
      }).join('');
    }
});