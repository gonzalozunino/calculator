'use strict'
Meteor.methods({
    calculateMath: function (url) {
        this.unblock();
        try {
            var result = HTTP.call('GET', 'http://api.mathjs.org' + url);
            return result.content;
        } catch (e) {
            // Got a network error, time-out or HTTP error in the 400 or 500 range.
            return e;
        }
    }
});