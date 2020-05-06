const sanitizeData = require('./sanitizeData');
const dailyReport = require('./dailyReport');

const BATCH_SIZE = 100;

exports.hourly = () => sanitizeData(BATCH_SIZE).then(console.log);
exports.daily = () => dailyReport().then(console.log);
