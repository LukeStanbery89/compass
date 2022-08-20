var $gXNCa$process = require("process");
var $gXNCa$path = require("path");



var $4559ecf940edc78d$exports = {};
function $4559ecf940edc78d$var$isHttpURL(string) {
    let url;
    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
}
$4559ecf940edc78d$exports = {
    isHttpURL: $4559ecf940edc78d$var$isHttpURL
};


var $4fa36e821943b400$require$isHttpURL = $4559ecf940edc78d$exports.isHttpURL;
const $4fa36e821943b400$var$compassconfig = $4fa36e821943b400$var$_getCompassConfig();
const $4fa36e821943b400$var$deviceMap = $4fa36e821943b400$var$compassconfig.deviceMap;
const $4fa36e821943b400$var$serviceMap = $4fa36e821943b400$var$compassconfig.serviceMap;
function $4fa36e821943b400$var$getServiceURL(service) {
    const serviceData = $4fa36e821943b400$var$serviceMap[service];
    if (!serviceData) throw Error("COMPASS ERROR: Invalid service identifier");
    const ip = $4fa36e821943b400$var$deviceMap[serviceData.device]?.ip;
    return `${serviceData.protocol}://${ip}:${serviceData.port}${serviceData.path}`;
}
function $4fa36e821943b400$var$_getCompassConfig() {
    const compassrc = require($gXNCa$path.join($gXNCa$process.cwd(), "/.compassrc.json"));
    if ($4fa36e821943b400$require$isHttpURL(compassrc.configpath)) throw Error("COMPASS ERROR: Compass currently only supports locally hosted files");
    else return require($gXNCa$path.join($gXNCa$process.cwd(), compassrc.configpath));
}
module.exports = {
    getServiceURL: $4fa36e821943b400$var$getServiceURL
};


//# sourceMappingURL=index.js.map
