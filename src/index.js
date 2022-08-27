const path = require('path');
const { isHttpURL } = require('./utils');
const compassrc = require(path.join(process.cwd(), '/.compassrc.json'));

const compassconfig = _getCompassConfig();
const deviceMap = compassconfig.deviceMap;
const serviceMap = compassconfig.serviceMap;

function getServiceURL(service) {
    const serviceData = serviceMap[service];
    if (!serviceData) {
        throw Error('COMPASS ERROR: Invalid service identifier');
    }
    const ip = deviceMap[serviceData.device]?.ip;
    return `${serviceData.protocol}://${ip}:${serviceData.port}${serviceData.path}`;
}

function _getCompassConfig() {
    if (isHttpURL(compassrc.configpath)) {
        throw Error('COMPASS ERROR: Compass currently only supports locally hosted files');
        // TODO: return compassrc.configpath;
    } else {
        return require(path.join(process.cwd(), compassrc.configpath));
    }
}

module.exports = {
    getServiceURL,
};