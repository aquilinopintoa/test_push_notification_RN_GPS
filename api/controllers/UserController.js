/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: (req, res) => {
        const user = {
            name: 'aquilino'
        }
        User.findOrCreate(user, user, (err, newUser) => {
            if(err){
                console.log(err)
            }else{
                console.log(newUser)
            }
            return res.json(newUser)
        })
    },

    update: (req, res) => {
        const params = req.params.all()
        const user = {
            token: params.token
        }
        console.log(params)
        User.update({name: 'aquilino'}, user, (err, changeUser) => {
            if(err){
                console.log(err)
            }else{
                console.log(changeUser)
            }
            return res.json(err || changeUser)
        })
    },

    find: (req, res) => {
        User.find({}, (err, users) => {
            if(err){
                console.log(err)
            }else{
                console.log(users)
            }
            return res.json(err || users)
        })
    }, 

    send: (req, res) => {
        const params = req.params.all()
        User.find({name:params.name}, (err, user) => {
            if(err || !user.length){
                console.log(err)
                return res.json(err)
            }else{
                const data = {
                    title: "test fcm",
                    body: "msg"
                }
                
                var message = {
                    to: user[0].token, // required fill with device token or topics
                    collapse_key: 'aqui.li.no', 
                    content_avalible: true,
                    data: {
                        type: params.type,
                        customer: {name:'fcm'},
                        call:{sessionId:'test'}
                    },
                    notification: {
                        title: 'Title of your push notification',
                        body: 'Body of your push notification',
                    }
                };

                FCM.send(message, function(err, response){
                    if (err) {
                        console.log("Something has gone wrong!", err);
                    } else {
                        console.log("Successfully sent with response: ", response);
                    }   
                    return res.json(user)
                });
            }
        })

    },

    callend: (req, res) => {
        GPS.getInvitations(
            '11111111-1111-1111-1111-111111111111',
            (err, invitation) => {
              if(invitation){
                  User.find({}, (err, user) => {
                    if(err || !user.length){
                        console.log(err)
                        return res.json(err)
                    }else{
                        console.log(user)
                        
                        var message = {
                            to: user[0].token, // required fill with device token or topics
                            collapse_key: 'aqui.li.no', 
                            content_avalible: true,
                            data: {
                                invitationId: invitation.id
                            },
                            notification: {
                                title: 'meyu',
                                body: 'meyu',
                            }
                        };
                        
                        FCM.send(message, function(err, response){
                            if (err) {
                                console.log("Something has gone wrong!", err);
                            } else {
                                console.log("Successfully sent with response: ", response);
                            }
                        });
                    }
                  })
            }
        })
        res.json(true)
    }
	
};

