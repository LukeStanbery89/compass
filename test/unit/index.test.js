let getServiceURL;

const mockRCLocal = {
    'configpath': './compass-config.json',
};
const mockRCRemote = {
    'configpath': 'https://mycdn.com/config.json',
};
const mockMasterConfig = {
    'deviceMap': {
        'FAKE_DEVICE': {
            'ip': '192.168.86.100',
        },
    },
    'serviceMap': {
        'FAKE_SERVICE': {
            'device': 'FAKE_DEVICE',
            'protocol': 'http',
            'port': '1000',
            'path': '/',
        },
    }
};

describe('Index', () => {
    describe('Locally hosted master config', () => {
        beforeAll(() => {
            jest.doMock('../../.compassrc.json', () => {
                return mockRCLocal;
            },
                { virtual: true }
            );

            jest.doMock('../../compass-config.json', () => {
                return mockMasterConfig;
            },
                { virtual: true }
            );

            getServiceURL = require('../../src/index').getServiceURL;
        });

        afterAll(() => {
            jest.resetModules();
            jest.resetAllMocks();
        });

        test('getServiceURL() returns the URL of an existing service', () => {
            const result = getServiceURL('FAKE_SERVICE');
            expect(result).toBe('http://192.168.86.100:1000/');
        });

        test('getServiceURL() throws an error when passing a non-existent service identifier', () => {
            return expect(() => {
                return getServiceURL('THIS_DOES_NOT_EXIST');
            }).toThrow('COMPASS ERROR: Invalid service identifier');
        });
    });

    describe('Remotely hosted master config', () => {
        beforeAll(() => {
            jest.doMock('../../.compassrc.json', () => {
                return mockRCRemote;
            },
                { virtual: true }
            );

            jest.doMock('../../compass-config.json', () => {
                return mockMasterConfig;
            },
                { virtual: true }
            );
        });

        afterAll(() => {
            jest.resetModules();
            jest.resetAllMocks();
        });

        test('getServiceURL() throws an error when trying to access remotely-hosted master config', () => {
            return expect(() => {
                getServiceURL = require('../../src/index').getServiceURL;
                return getServiceURL('FAKE_SERVICE');
            }).toThrow('COMPASS ERROR: Compass currently only supports locally hosted files');
        });
    });
});