
var request = require('request');
var moment = require('moment')

module.exports = {
    getInvitations(id, cb){

        var options = {
            method: 'GET',
            url: `${sails.config.serverURL}/v1/users/${id}/linguist-profile/session-invitations`,
            headers: { Authorization: `Bearer ${sails.config.tokenAuth}` }
        };

        var polling = true
        setTimeout((()=>{
            request(options, (err, res, body)=>{
                if(err){
                    console.log("error <<<< ", err)
                }else{
                    const data = JSON.parse(body)
                    if(!data.length){
                        console.log("no hay invitaciones")
                        return GPS.getInvitations(id, cb)
                    }

                    const sorted = _.sortBy(data, (i) => new moment(i.createdAt))
                    const last_invitation = sorted[sorted.length-1]

                    const dateTarget = new moment(last_invitation.createdAt)

                    const diff = dateTarget.diff(moment(), "seconds") 
                    console.log(diff, polling)
                    if(diff <= 0 && diff >= -30 && polling){
                        // send push
                        console.log(last_invitation)
                        cb(undefined, last_invitation)
                    }else{
                        console.log("no hay invitaciones")
                        GPS.getInvitations(id, cb)
                    }
                }
            })
        }), 10*1000)
    }
};