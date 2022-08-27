const { isHttpURL } = require('../../src/utils');

describe('Utilities', () => {
    test('isHttpURL() correctly identifies an HTTP URL', () => {
        const result = isHttpURL('https://google.com');
        expect(result).toBe(true);
    });

    test('isHttpURL() correctly identifies an IP address', () => {
        const result = isHttpURL('192.186.0.0');
        expect(result).toBe(false);
    });
});