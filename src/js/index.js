var angular = require('angular');
var router = require('angular-ui-router');

angular.module('myApp', [
    router
]);

// home page
require('../index.html');

//directives
require('./directives/index');

//routes config
require('./config.route');

// data access layer
require('./dal/index');

// css
require('../sass/index.scss');

// pages
require('./pages/index');

// services
require('./services/index');