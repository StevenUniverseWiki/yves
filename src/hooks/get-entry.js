// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars

const removeEmpty = (item) => {
	if (item['updatedAt']) delete item['updatedAt'];
	if (item.hasOwnProperty('__v')) delete item.__v;
	if (!item.deleted) {
		delete item.deleted;
		delete item.deletionReason;
	}
	if (item.event !== 'MESSAGE' && item.event !== 'ME') delete item['text'];
	if (item.event !== 'BAN' && item.event !== 'UNBAN') {
		delete item['banLength'];
		delete item['banReason'];
	}
	if (item.event !== 'BAN' && item.event !== 'UNBAN' && item.event !== 'KICK') {
		delete item['targetUser'];
	}
  	return item;
}

module.exports = (options = {}) => {
  return async context => {
  	const { result } = context;
    if (Array.isArray(result.data)) {
      result.data.forEach((item) => {
        item = removeEmpty(item);
      });
    } else if (result.data) {
      result.data = removeEmpty(result.data);
    }

  	context.result = result;
    return context;
  };
};
