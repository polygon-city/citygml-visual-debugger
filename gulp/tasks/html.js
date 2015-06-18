"use strict";

var config         = require("../config");
var gulp           = require("gulp");

// Views task
gulp.task("html", function() {

  // Put our index.html in the dist folder
  gulp.src("app/index.html")
    .pipe(gulp.dest(config.dist.root));

  // // Process any other view files from app/views
  // return gulp.src(config.views.src)
  //   .pipe(templateCache({
  //     standalone: true
  //   }))
  //   .pipe(gulp.dest(config.views.dest));

});
