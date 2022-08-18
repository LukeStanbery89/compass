const deviceMap = require('./config/device-map.json');
const serviceMap = require('./config/service-map.json');

function getURL(service) {
    const serviceData = serviceMap[service];
    if (!serviceData) {
        throw Error('COMPASS ERROR: Invalid service identifier');
    }
    const ip = deviceMap[serviceData.device]?.ip;
    return `${serviceData.protocol}://${ip}:${serviceData.port}${serviceData.path}`;
}

module.exports = {
    getURL,
};