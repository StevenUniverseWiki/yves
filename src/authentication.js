const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');
const axios = require('axios');

const DISCORD_API_BASE = 'https://discord.com/api/v6';
const roleMapping = require('../config/roles.json');

class DiscordStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      discordId: profile.id,
      discordTag: `${profile.username}#${profile.discriminator}`,
      username: profile.username,
      avatar: profile.avatar,
      email: profile.email
    };
  }

}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('discord', new DiscordStrategy());

  app.use('/authentication', authentication);
/*
  app.service('authentication').hooks({
    after: {
      create: [
        async hook => {
          const { data, result } = hook;
          console.log('Discord user:', result.user);
          // TODO: cancel if data.strategy!= discord

          console.log('[Discord oauth] Fetching user guilds');
          const listGuilds = await axios({
            method: 'GET',
            url: `${DISCORD_API_BASE}/users/@me/guilds`,
            headers: {
              'Authorization': `Bearer ${data.access_token}`
            }
          }).catch({
            // something exploded
          });
          console.log('Discord response:', listGuilds.data);
          if (listGuilds.data.some(guild => guild.id === process.env.DISCORD_SERVER_ID)) {
            // user is in guild, check their roles

          } else {
            // not in guild
            console.log('[Discord oauth] User is not in requested guild');
            hook.result.user.roles = [];
            hook.result.user.permissions = [];
          }

          return hook;
        }
      ]
    }
  });
*/

  app.configure(expressOauth());
};