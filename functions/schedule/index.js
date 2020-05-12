const sanitizeData = require('./sanitizeData');
const dailyReport = require('./dailyReport');

exports.hourly = () => sanitizeData().then(console.log);
exports.daily = () => dailyReport().then(console.log);
