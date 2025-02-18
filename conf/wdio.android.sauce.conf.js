const { config } = require('./wdio.shared.conf');

//
// ============
// Capabilities
// ============
// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
// time. Depending on the number of capabilities, WebdriverIO launches several test
// sessions. Within your capabilities you can overwrite the spec and exclude options in
// order to group specific specs to a specific capability.
//
// First, you can define how many instances should be started at the same time. Let's
// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
// files and you set maxInstances to 10, all spec files will get tested at the same time
// and 30 processes will get spawned. The property handles how many capabilities
// from the same test should run tests.

config.services = config.services.concat([['sauce']]);
config.region = 'eu';
config.user = process.env.USERNAME;
config.key = process.env.ACCESS_KEY;
config.maxInstances = parseInt(process.env.ANDROID_MAX_INSTANCES) || 20;
config.appium = {
  command: 'appium',
  args: ['--relaxed-security'],
};

config.capabilities = [
  {
    app: 'storage:filename=app-release-master-build-number-78449.apk", "upload_timestamp": 1732325293',
    'cjson:metadata': {
      device: process.env.DEVICE || 'Samsung Galaxy S10 WQHD GoogleAPI Emulator',
      app: {
        name: 'Test',
        version: '1.0.0',
      },
      platform: {
        name: 'android',
        version: process.env.PLATFORM_VERSION || '11.0',
      },
    },
    appiumVersion: process.env.APPIUM_VERSION || '1.22.3',
    autoGrantPermissions: true,
    automationName: 'UiAutomator2',
    connectionRetryTimeout: 90000,
    deviceName: process.env.DEVICE || 'Samsung Galaxy S10 WQHD GoogleAPI Emulator',
    extendedDebugging: false,
    fullContextList: true,
    recordScreenshots: false,
    timeZone: 'Dublin',
    tunnelIdentifier: process.env.TUNNEL_IDENTIFIER,
    platformName: 'android',
    platformVersion: process.env.PLATFORM_VERSION || '11.0',
    unicodeKeyboard: true,
    videoUploadOnPass: false,
  },
];

exports.config = config;
