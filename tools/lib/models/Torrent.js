/**
 * Created by ianpfeffer on 10/27/15.
 * Copyright Netscout 2015
 */
function Torrent(name, path, type, dlDate) {
    this.name = name;
    this.path = path;
    this.type = type;
    this.dlDate = dlDate || new Date();
}

Torrent.prototype.insert = function(db, collectionName, callback) {
    db.collection(collectionName).insertOne(this, function(err, result) {
        callback(result)
    });
};

Torrent.prototype.insertUnique = function(db, collectionName, callback) {
    var doc = db.collection(collectionName).find({name: this.name}).limit(1);

    if (!doc) {
        db.collection(collectionName).insertOne(this, function(err, result) {
            callback(true)
        });
    } else {
        callback(false)
    }
};

module.exports = Torrent;