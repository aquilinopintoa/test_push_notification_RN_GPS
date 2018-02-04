const PushNotifications = new require('node-pushnotifications');

class NotificationService {
  init() {
    this.config = sails.config.pushnotifications;
    this.push   = new PushNotifications(this.config);
    console.log(this.push)
  }

  send(registrationIds, data) {
    return this.push.send(registrationIds, data);
  }
}

module.exports = new NotificationService();