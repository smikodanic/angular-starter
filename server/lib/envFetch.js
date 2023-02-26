module.exports = process.env.NODE_ENV === 'production' ? require('../tmp/envs/production.env.js') : require('../tmp/envs/development.env.js');
