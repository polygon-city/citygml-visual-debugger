"use strict";

module.exports = {

  "browserport"  : 3000,
  "uiport"       : 3001,
  "serverport"   : 3002,

  "styles": {
    "src" : "app/styles/**/*.scss",
    "dest": "build/css"
  },

  "scripts": {
    "src" : "app/js/**/*.js",
    "dest": "build/js"
  },

  // "images": {
  //   "src" : "app/images/**/*",
  //   "dest": "build/images"
  // },
  //
  // "fonts": {
  //   "src" : ["app/fonts/**/*"],
  //   "dest": "build/fonts"
  // },

  "html": {
    "src" : ["app/**/*.html"]
  },

  // "gzip": {
  //   "src": "build/**/*.{html,xml,json,css,js,js.map}",
  //   "dest": "build/",
  //   "options": {}
  // },

  "dist": {
    "root"  : "build"
  },

  "browserify": {
    "entries"   : ["./app/js/app.jsx"],
    "bundleName": "app.js",
    "sourcemap" : true
  }

  // "test": {
  //   "karma": "test/karma.conf.js",
  //   "protractor": "test/protractor.conf.js"
  // }

};
