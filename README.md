# Compass
Package for interfacing with a directory of ports and static IPs addresses on the LAN.

# Installation
Install Compass using the follow command:

```
npm install @lukestanbery/compass
```

# Configuration
Compass requires two config files:

**Master Config** - This file can have any name and can be located anywhere on the same machine, but it requires the following JSON schema, where `MY_SERVER` is the name given to the device such as a server, and `MY_APP` is the name of a single application:

**Note:** Compass currently only supports locally-hosted master config files. Support for remote/CDN-hosted files is coming soon.

```json
{
    "deviceMap": {
        "MY_SERVER": {
            "ip": "192.168.86.100"
        },
        ...
    },
    "serviceMap": {
        "MY_APP": {
            "device": "MY_SERVER",
            "protocol": "https",
            "port": "1000",
            "path": "/"
        },
        ...
    }
}
```

**.compassrc.json** - This is the config file that contains the Compass config for your project. This file will tell your project where the Master Config file is located. The only supported format is JSON and the only supported file name is `.compassrc.json`.

```json
{
    "configpath": "/path/to/compass/config.json"
}
```

# Usage
```javascript
const compass = require('@lukestanbery/compass');

const pathToMyApp = compass.getServiceURL('MY_APP');
console.log(pathToMyApp); // https://192.168.86.100:1000/
```

# Additional Caveats
Compass currently only supports CommonJS modules.
