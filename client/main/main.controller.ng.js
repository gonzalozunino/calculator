'use strict'

angular.module('calApp')
.controller('MainCtrl', function($scope, $meteor) {
    // Collection init
    $scope.sessions = $scope.$meteorCollection(Sessions);
    $meteor.autorun($scope, function() {
        $scope.$meteorSubscribe('sessions');
    });

    $meteor.session('sessionsCounter').bind($scope, 'page');

    // Bound to the output display
    $scope.output = "0";
    // Check to change default value
    $scope.newNumber = true;

    $scope.updateOutput = function(btn) {
        var operations = {
            bro: '(',
            brc: ')',
            log: 'log',
            div: '/',
            mul: '*',
            sub: '-',
            point: '.',
            add: '+'
        };

        if($scope.output == "0" || $scope.newNumber) {
            $scope.msg = "";
            if (!operations[btn]) {
                $scope.output =  btn;
                $scope.newNumber = false;
            }
        } else {
            $scope.output += operations[btn] || String(btn);
        }
    };

    $scope.calculate = function() {
        var sessionToSave = {name: $scope.output};
        var url = '/v1/?expr=' + encodeURIComponent($scope.output);

        $meteor.call('calculateMath', url).then(
            function(data){
                $scope.output = data;
                $scope.newNumber = true;
                
                sessionToSave.name += ' = ' + $scope.output;
                $scope.sessions.save(sessionToSave);
            },
            function(err){
                $scope.output = "#ERROR!";
                $scope.newNumber = true;
        });

        /*MathHttpService.getInfo(url).then(function(info) {
            $scope.output = info;
            $scope.newNumber = true;

            sessionToSave.name += ' = ' + $scope.output;
            $scope.sessions.save(sessionToSave);

        }, function(error) {
            // promise rejected, could log the error with: console.log('error', error);
            $scope.output = "#ERROR!";
            $scope.newNumber = true;
        });*/
    };

    $scope.clear = function() {
        $scope.output = "0";
    };

    $scope.remove = function(thing) {
        $scope.sessions.remove(thing);
    };

});