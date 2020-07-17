const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {
  create (data, params) {
    // This is the information we want from the user signup data
    const {
    	discordId,
    	discordTag,
    	username,
    	password,
    	avatar,
    	email,
        roles,
        permissions
    } = data;

    // The complete user
    const userData = {
    	discordId,
    	discordTag,
    	username,
    	password,
    	avatar,
    	email,
        roles,
        permissions
    };
    console.log(userData);

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }  
};
