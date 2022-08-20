var $3b5e3b21ef31f932$exports = {};
$3b5e3b21ef31f932$exports = JSON.parse('{"MACBOOK":{"ip":"192.168.86.100"},"ATLAS":{"ip":"192.168.86.200"},"ABICUS":{"ip":"192.168.86.300"},"ASTROLABE":{"ip":"192.168.86.400"},"CODEX":{"ip":"192.168.86.500"}}');


var $5772b054cc21f006$exports = {};
$5772b054cc21f006$exports = JSON.parse('{"first":{"device":"ATLAS","protocol":"http","port":"1000","path":"/"},"second":{"device":"ATLAS","protocol":"http","port":"2000","path":"/"}}');


function $4fa36e821943b400$var$getURL(service) {
    const serviceData = $5772b054cc21f006$exports[service];
    if (!serviceData) throw Error("COMPASS ERROR: Invalid service identifier");
    const ip = $3b5e3b21ef31f932$exports[serviceData.device]?.ip;
    return `${serviceData.protocol}://${ip}:${serviceData.port}${serviceData.path}`;
}
module.exports = {
    getURL: $4fa36e821943b400$var$getURL
};


//# sourceMappingURL=index.js.map
