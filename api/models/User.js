/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 * test-gcm-193522
 */

module.exports = {

  attributes: {
    id: {
      autoIncrement: true,
      required: true,
    },

    name: {
      unique: true,
      type: 'string',
      required: true
    },

    token:{
      type: 'string'
    }

  }
};

