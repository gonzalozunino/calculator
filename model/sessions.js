/***
 *  Mongo collections here
 *  Insert, Update, Delete
 */
Sessions = new Mongo.Collection('sessions');

Sessions.allow({
    insert: function(userId, session) {
        session.createdAt = new Date();
        return true;
    },
    update: function(userId, session, fields, modifier) {
        session.createdAt = new Date();
        return true;
    },
    remove: function(userId, session) {
        return true;
    }
});