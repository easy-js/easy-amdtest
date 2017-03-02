(function(root, factory) {
        root['EasyAMDTest'] = factory();
}(this, function() {

/*!
 * mocha/test.js:
 *
 * (C) 2014 First Opinion
 * MIT LICENCE
 *
 */
var mochaTest;
mochaTest = function () {
  // ----------------------------------------------------------------------------
  // MochaTest Class
  //
  // Configure & run mocha tests
  // ----------------------------------------------------------------------------
  /**
   * Interface for configuring and executing mocha tests.
   *
   * @constructor
   * @public
   *
   * @param {Object} configuration - Requirejs configuration.
   */
  var MochaTest = function (opts) {
    this.opts = {};
    for (var k in this._defaults) {
      this.opts[k] = this._defaults[k];
    }
    for (var j in opts) {
      this.opts[j] = opts[j];
    }
  };
  /**
   * @private
   *
   * @property {Object} _defaults Default values for mocha tests.
   * @attribute {String} style - The style of tests for mocha to implement. 
   */
  MochaTest.prototype._defaults = { style: 'bdd' };
  /**
   * Setup mocha tests by specifing style and reporting mechanism.
   *
   * @public
   */
  MochaTest.prototype.setup = function () {
    mocha.setup(this.opts.style);
    mocha.reporter('html');
  };
  /**
   * Run Mocha tests. Decides wether or not to use phantom implementation.
   *
   * @public
   */
  MochaTest.prototype.run = function () {
    var mPhantom = window.mochaPhantomJS;
    return mPhantom ? mPhantom.run() : mocha.run();
  };
  // ----------------------------------------------------------------------------
  // Expose
  // ----------------------------------------------------------------------------
  return MochaTest;
}();
/*!
 * mocha/reporter.js:
 *
 * (C) 2014 First Opinion
 * MIT LICENCE
 *
 */
var mochaReporter;
mochaReporter = function () {
  // ----------------------------------------------------------------------------
  // MochaReporter Class
  //
  // Class used to expose test mocha results
  // ----------------------------------------------------------------------------
  /**
   * Class that exposes Mocha to test results to be consumed by 3rd party applications.
   *
   * @constructor
   * @public
   *
   * @param {Runner Instance} runner - The object returned by mocha.run().
   */
  var MochaReporter = function (runner) {
    // Cache this
    var self = this;
    // Save instance vars
    this.runner = runner;
    // Hold all err objects
    this.failed = [];
    this.runner.on('fail', function () {
      self._onFail.apply(self, arguments);
    });
    this.runner.on('end', function () {
      self._onEnd.apply(self, arguments);
    });
  };
  /**
   * Handler called when an error is raised in the runner. Pushes results to failed array store.
   *
   * @private
   *
   * @param {Object} test - test object passed by runner 'fail' event.
   * @param {Object} err - err object passed by runner 'fail' event.
   */
  MochaReporter.prototype._onFail = function (test, err) {
    this.failed.push({
      name: test.title,
      result: false,
      message: err.message,
      stack: err.stack,
      titles: this._flattenTitles(test)
    });
  };
  /**
   * Handler called when runner completes.
   *
   * @private
   */
  MochaReporter.prototype._onEnd = function () {
    window.mochaResults = this.runner.stats;
    window.mochaResults.reports = this.failed;
  };
  /**
   * Utility in order to array based on nested titles.
   *
   * @private
   */
  MochaReporter.prototype._flattenTitles = function (test) {
    var titles = [];
    while (test.parent.title) {
      titles.unshift(test.parent.title);
      test = test.parent;
    }
    return titles;
  };
  // ----------------------------------------------------------------------------
  // Expose
  // ----------------------------------------------------------------------------
  return MochaReporter;
}();
/*!
 * frameworks.js:
 *
 * (C) 2014 First Opinion
 * MIT LICENCE
 *
 */
var frameworks;
frameworks = function (MochaTest, MochaReporter) {
  // ----------------------------------------------------------------------------
  // Frameworks (Expose)
  // ----------------------------------------------------------------------------
  /**
   * Key value mapping for frameworks and associated Testing and
   * Reporting classes.
   */
  return {
    'mocha': {
      Test: MochaTest,
      Reporter: MochaReporter
    }
  };
}(mochaTest, mochaReporter);
/*!
 * easy-amdtest.js:
 *
 * (C) 2014 First Opinion
 * MIT LICENCE
 *
 */
var easyAmdtest;
easyAmdtest = function (frameworks) {
  // ----------------------------------------------------------------------------
  // EasyAMDTest Class
  //
  // Class for quickly and easily testing AMD modules.
  // ----------------------------------------------------------------------------
  /**
   * Interface for running tests on AMD compatible files.
   *
   * **Examples**:
   *
   * ```
   * var tests = new EasyAMDTest({
   *   baseUrl: '../src',
   *   paths: {
   *     'underscore': '/bower_components/underscore/underscore'
   *   }
   * });
   * ```
   *
   * @constructor
   * @public
   *
   * @param {Object} configuration - Requirejs configuration.
   */
  var EasyAMDTest = function (configuration) {
    // Save configure
    this.configuration = configuration;
    // Rewrite require paths so that they solve
    // correctly when run locally
    require.config(this.configuration);
  };
  /**
   * Run your test suite.
   *
   * Examples:
   *
   * ```
   * new EasyAMDTest(requireConfig).run({
   *   name: 'mocha',
   *   opts: {
   *     style: 'bdd'
   *   }
   * });
   * ```
   *
   * @public
   *
   * @param {String} baseDir - The baseDir which all paths will be resolved
   * relative to.
   */
  EasyAMDTest.prototype.run = function (opts) {
    // Cache this
    var self = this;
    // Create new test instance based on passed
    // parameters
    this.framework = frameworks[opts.name];
    this.test = new this.framework.Test(opts.opts);
    // Load dependencies & perform tests
    // amdclean-ignore
    require([
      'require',
      opts.name
    ].concat(opts.dependencies), function (require) {
      if (typeof initMochaPhantomJS === 'function') {
        initMochaPhantomJS();
      }
      // Setup test framework if needed
      if (self.test.setup) {
        self.test.setup();
      }
      // Use runner and report - Used for cross browser testing
      // amdclean-ignore
      require(opts.tests, function () {
        new self.framework.Reporter(self.test.run());
      });
    });
  };
  // ----------------------------------------------------------------------------
  // Expose
  // ----------------------------------------------------------------------------
  return EasyAMDTest;
}(frameworks);


return easyAmdtest;

}));