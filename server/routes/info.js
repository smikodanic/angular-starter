const timeLib = require('../lib/timeLib.js');
const env = require('../lib/envFetch.js');
const pkg = require('../package.json');


module.exports = (req, res) => {
  const uptime = process.uptime();
  const uptime_human = timeLib.secondsToHumanReadable(uptime);

  const jdata = {
    api: {
      name: env.api_name,
      version: pkg.version,
    },
    nodejs: {
      version: process.version,
      platform: process.platform,
      uptime: uptime,
      uptime_human: uptime_human
    }
  };
  res.json(jdata);
};
