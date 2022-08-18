const deviceMap = require('./config/device-map.json');
const serviceMap = require('./config/service-map.json');
const { baseIP } = require('./config/config.json');

function getURL(service) {
    const serviceData = serviceMap[service];
    const ipSuffix = deviceMap[serviceData.device]?.ipSuffix;
    return `${serviceData.protocol}://${baseIP}${ipSuffix}:${serviceData.port}${serviceData.path}`;
}

module.exports = {
    getURL,
};