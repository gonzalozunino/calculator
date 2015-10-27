/***
 * Meteor on startup
 */
Meteor.startup(function() {
    if(Sessions.find().count() === 0) {
        var sessions = [
            '(5+4)-1 = 8'
        ];
        sessions.forEach(function(session) {
            Sessions.insert({
                name: session,
                name_sort: session.toLowerCase(),
                createdAt: new Date()
            });
        });
    }
});