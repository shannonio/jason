module.exports = function(config) {
  config.set({

    browsers: ['PhantomJS'],

    frameworks: ['jasmine-jquery', 'jasmine'],

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    files: [
      // bower dist dependencies
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-event/src/event.js',
      'bower_components/angular-ui-indeterminate/src/indeterminate.js',
      'bower_components/angular-ui-mask/src/mask.js',
      'bower_components/angular-ui-scroll/dist/ui-scroll.js',
      'bower_components/angular-ui-scrollpoint/src/scrollpoint.js',
      'bower_components/angular-ui-uploader/src/uploader.js',
      'bower_components/angular-ui-validate/src/validate.js',
      'bower_components/angular-ui-utils/index.js',


      // bower test dependencies
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',

      //Spec Helpers
      'spec-helper.js',

      // your implementation files
      'app.js',
      'partial/**/*.js',
      'partial/**/*.html'
      'directive/**/**.js',
      'directive/**/*.html'

    ],

    ngHtml2JsPreprocessor: {
      moduleName: 'genTest',
      // or define a custom transform function
      //      cacheIdFromPath: function(filepath) {
      //        console.error("=============>", filepath);
      //        return cacheId;
      //      }
    },

    reporters: ['mocha'],

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO
  });
};
