const path = require('path');
const APP_CONFIG = require('./config.json');
const { isHttpURL } = require('./utils/string-utils');
const compassrc = require(path.join(process.cwd(), "/.compassrc.json"));
const satchel = require('@lukestanbery/satchel');

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
    let masterConfig = satchel.read(APP_CONFIG.masterConfigCacheKey);
    if (!masterConfig) {
        console.log('writing to cache...');
        if (isHttpURL(compassrc.configpath)) {
            throw Error('COMPASS ERROR: Compass currently only supports locally hosted files');
            // TODO: return compassrc.configpath;
        } else {
            masterConfig = require(path.join(process.cwd(), compassrc.configpath));
            console.log('masterConfig: ', masterConfig);
        }
        satchel.write(APP_CONFIG.masterConfigCacheKey, masterConfig);
    }
    return masterConfig;
}

module.exports = {
    getServiceURL,
};
