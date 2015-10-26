'use strict'

angular.module('calApp')
.controller('MainCtrl', function($scope, MathHttpService) {

    // Bound to the output display
    $scope.output = "0";

    // Used to evaluate whether to start a new number
    // in the display and when to concatenate
    $scope.newNumber = true;

    // Holds the pending operation so calculate knows
    // what to do
    $scope.pendingOperation = null;

    // Bound to the view to display a token indicating
    // the current operation
    $scope.operationToken = "";

    // Holds the running total as numbers are added/subtracted
    $scope.runningTotal = null;

    // Holds the number value of the string in the display output
    $scope.pendingValue = null;

    // Tells calculate what to do when the equals buttons is clicked repeatedly
    $scope.lastOperation = null;

    // Constants
    var ADD = "adding";
    var SUBTRACT = "subtracting";
    var ADD_TOKEN = "+";
    var SUBTRACT_TOKEN = "-";

    MathHttpService.getInfo().then(function(info) {
    }, function(error) {
        // promise rejected, could log the error with: console.log('error', error);
    });
});