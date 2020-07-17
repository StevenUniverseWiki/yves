const axios = require('axios');
const DISCORD_API_BASE = 'https://discord.com/api/v6';
const roleMapping = require('../../config/roles.json');
const {
	NotFound,
	GeneralError,
	BadRequest,
	Forbidden
} = require('@feathersjs/errors');

module.exports = (options = {}) => {
  return async context => {
  	const { data } = context;
  	try {
	    const member = await axios({
	      method: 'GET',
	      url: `${DISCORD_API_BASE}/guilds/${process.env.DISCORD_SERVER_ID}/members/${data.discordId}`,
	      headers: {
	        'Authorization': `Bot ${process.env.DISCORD_BOT_TOKEN}`
	      }
	    });
	    console.log(member.data);
	    const roleList = member.data.roles;
	    let memberRoles = [];
	    let memberPermissions = [];
	    roleList.forEach((roleId) => {
	      if (roleMapping.hasOwnProperty(roleId)) {
	        const role = roleMapping[roleId];
	        memberRoles.push(role);
	        memberPermissions = [...new Set([...memberPermissions, ...role.permissions])];
	      }
	    });
	    console.log('Member roles:', memberRoles);
	    console.log('Member permissions:', memberPermissions);
	    data.roles = memberRoles;
	    data.permissions = memberPermissions;
  	} catch (err) {
    	// user is not in guild, or something exploded
    	if (err.response && err.response.data) {
    		if (err.response.data.message === 'Unknown User' || err.response.data.message === 'Unknown Member') {
    			return Promise.reject(new Forbidden({
    				message: 'Unauthorized'
    			}));
    		} else {
     			return Promise.reject(new GeneralError(err.response.data));   			
    		} 
    	} else {
    		console.error(err.message);
    			return Promise.reject(new GeneralError({
    				message: 'Communication error'
    			}));
    	}  		
  	}

		context.data = data;
    return context;
  };
};