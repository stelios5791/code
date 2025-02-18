const { generate } = require('multiple-cucumber-html-reporter');
const { removeSync } = require('fs-extra');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');


exports.config = {
  runner: 'local',
  specs: [
    './test/features/**/*.feature',
    './test/features/**/**/*.feature'
  ],
  suites: {
    androidEdge: ['./test/features/androidEdge/**/*.feature'],
    androidOnly: ['./test/features/androidOnly/**/*.feature'],
    e2e: ['./test/features/e2e/**/*.feature'],
    iosOnly: ['./test/features/iosOnly/**/*.feature'],
  },
  // Patterns to exclude.
  exclude: [
  ],
  logLevel: 'silent',
  deprecationWarnings: true,
  bail: 0,
  baseUrl: '',
  waitforTimeout: 20000,
  // Default request retries count
  connectionRetryCount: 3,
  framework: 'cucumber',
  //
  specFileRetries: 2,
  //

  reporters: ['spec',
    [ 'cucumberjs-json', {
      jsonFolder: './test/test/json/',
    },
    ],
  ],
  //
  // If you are using Cucumber you need to specify the location of your step definitions.
  cucumberOpts: {
    require: [
      './test/step_definitions/*.js'
    ],        // <string[]> (file/dir) require files before executing features
    backtrace: false,   // <boolean> show full backtrace for errors
    requireModule: [],  // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
    dryRun: false,      // <boolean> invoke formatters without executing steps
    failFast: true,    // <boolean> abort the run on first failure
    format: ['pretty'], // <string[]> (type[:path]) specify the output format, optionally supply PATH to redirect formatter output (repeatable)
    colors: true,       // <boolean> disable colors in formatter output
    snippets: true,     // <boolean> hide step definition snippets for pending steps
    source: true,       // <boolean> hide source uris
    profile: [],        // <string[]> (name) specify the profile to use
    strict: true,      // <boolean> fail if there are any undefined or pending steps
    tagExpression: '(not @wip) and (not @inapp)',  // <string> (expression) only execute the features or scenarios with tags matching the expression
    timeout: 400000,     // <number> timeout for step definitions
    ignoreUndefinedDefinitions: false, // <boolean> Enable this config to treat undefined definitions as warnings.
    defaultTimeoutInterval: 10000
  },

  // ========================
  // Native app compare setup
  // ========================
  services: [[
    'native-app-compare',
    // The options
    {
      // Mandatory
      baselineFolder: '.dist/test/baseline',
      screenshotPath: '.dist/test/screenshots',
      // Optional
      autoSaveBaseline: true,
      blockOutIphoneXBottomBar: true,
      blockOutStatusBar: true,
      blockOutNavigationBar: true,
      savePerDevice: true,
      rawMisMatchPercentage: false,
      ignoreAntiAlliasing: true
    },
  ],
  ],

  //
  // =====
  // Hooks
  // =====
  // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
  // it and to build services around it. You can either apply a single function or an array of
  // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
  // resolved to continue.
  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onPrepare() {
    // Remove the `.tmp/` folder that holds the json and report files
    removeSync('./test/output/');
  },
  /**
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: () => {
    require('@babel/register');
    require('expect-webdriverio');
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  before() {
    global.assert = chai.assert;
    global.should = chai.should();
    global.chaiAsPromise = chai.use(chaiAsPromised);

  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  // beforeCommand: function (commandName, args) {
  // },
  /**
   * Runs before a Cucumber feature
   */
  // beforeFeature: function (uri, feature, scenarios) {
  // },
  /**
   * Hook that gets executed _after_ every hook within the suite ends.
   * (For example, this runs after calling `before`, `beforeEach`, `after`, `afterEach` in Mocha.)
   *
   * (`stepData` and `world` are Cucumber-specific.)
   */
  // afterHook: function (test, context, { error, result, duration, passed, retries }/*, stepData, world*/) {
  // },
  /**
   * Runs before a Cucumber scenario
   */
  // beforeScenario: function (uri, feature, scenario, sourceLocation) {
  // },
  /**
   * Runs before a Cucumber step
   */
  // beforeStep: function (uri, feature) {
  // },
  /**
   * Runs after a Cucumber step
   */
  // afterStep: function (uri, feature, { error, result }) {
  // },
  /**
   * Runs after a Cucumber scenario
   */
  // afterScenario: function (uri, feature, scenario, result, sourceLocation) {
  // },
  /**
   * Runs after a Cucumber feature
   */
  // afterFeature: function (uri, feature, scenarios) {
  // },

  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  // afterCommand: function (commandName, args, result, error) {
  // },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // after: function (result, capabilities, specs) {
  // },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  // afterSession: function (config, capabilities, specs) {
  // },
  /**
   * Gets executed after all workers got shut down and the process is about to exit. An error
   * thrown in the onComplete hook will result in the test run failing.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {<Object>} results object containing test results
   */
  onComplete() {
    // Generate the report when it all tests are done
    generate({
      // Required
      // This part needs to be the same path where you store the JSON files
      // default = '.tmp/json/'
      jsonDir: './test/test/json/',
      reportPath: './test/test/report/',
      openReportInBrowser: true,
      displayDuration: true,
      // for more options see https://github.com/wswebcreation/multiple-cucumber-html-reporter#options
    });
  },
  /**
   * Gets executed when a refresh happens.
   * @param {String} oldSessionId session ID of the old session
   * @param {String} newSessionId session ID of the new session
   */
  //onReload: function(oldSessionId, newSessionId) {
  //}
};
