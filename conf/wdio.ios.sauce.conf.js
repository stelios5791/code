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
config.maxInstances = parseInt(process.env.IOS_MAX_INSTANCES) || 30;

config.capabilities = [
  {
    app: 'storage:filename=TestApp-'+ process.env.TUNNEL_IDENTIFIER +'.app.zip',
    'cjson:metadata': {
      device: process.env.IOS_DEVICE_NAME || 'iPhone XR Simulator',
      app: {
        name: 'test',
        version: '1.0.0'
      },
      platform: {
        name: 'ios',
        version: process.env.PLATFORM_VERSION || '14.3'
      }
    },
    appiumVersion: process.env.APPIUM_VERSION || '1.22.3',
    autoDismissAlerts: true,
    automationName: 'XCUITest',
    connectionRetryTimeout: 90000,
    deviceName: process.env.IOS_DEVICE_NAME || 'iPhone XR Simulator',
    extendedDebugging: false,
    fullContextList: true,
    idleTimeout: 180,
    includeSafariInWebviews: true,
    locationServicesEnabled: true,
    locationServicesAuthorized: true,
    maxTypingFrequency: 100,
    newCommandTimeout: 180,
    noReset: true,
    platformName: 'iOS',
    platformVersion: process.env.PLATFORM_VERSION || '14.3',
    recordScreenshots: false,
    timeZone: 'Dublin',
    tunnelIdentifier: process.env.TUNNEL_IDENTIFIER,
    unicodeKeyboard: true,
    videoUploadOnPass: false,
  }
];

exports.config = config;
