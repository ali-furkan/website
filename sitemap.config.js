const webConfig = require("./web.config");

module.exports = {
    siteUrl: `https://${webConfig.publishdomain}`,
    generateRobotsTxt: true,
};
