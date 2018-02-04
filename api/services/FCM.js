const FCM = require('fcm-push')
const config = sails.config.serverKeyFCM;
const fcm = new FCM(config);

module.exports = {
    send(data, cb){
        fcm.send(data, function(err, response){
            if (err) {
                cb(err)
            } else {
                cb(undefined, response);
            }
        });
    }
};