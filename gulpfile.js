var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var gwebpack = require('gulp-webpack');
var guglify = require('gulp-uglify');
var rimraf = require('rimraf');
var concatCss = require('gulp-concat-css');
var srcPath = "src";
var modulesPath = "node_modules";
var distPath = "dist";
var serverMain = srcPath + "/server.js";

var webpack = function(watch) {
  var options;
  options = {
    watch: watch,
    cache: true,
    //Comment in PROD
    devtool: "source-map",
    output: {
      filename: "app.js",
      sourceMapFilename: "[file].map"
    },
    resolve: {
      extensions: ["", ".webpack.js", ".js"],
      modulesDirectories: [modulesPath]
    },
    module: {
      loaders: [
        {
          test: [/\.js$/, /\.jsx$/],
          exclude: [new RegExp(modulesPath)],
          loader: "babel-loader",
          query: {
              presets: ['react', 'es2015']
          }
        },
        { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" }
      ]
    }
  };
  return gulp.src(srcPath + "/app.js")
    .pipe(gwebpack(options))
    //Uncomment in PROD
    //.pipe(guglify({mangle: true}))
    .pipe(gulp.dest(distPath));
};

gulp.task('jsbundle', function() {
  return webpack(false);
});

gulp.task('jswatch', function() {
  return webpack(true);
});

gulp.task('style', function() {
  return gulp.src([modulesPath + "/bootstrap/dist/css/bootstrap.min.css",
          modulesPath + "/bootstrap/dist/css/bootstrap-theme.min.css",
          modulesPath + "/font-awesome/css/font-awesome.min.css",
          srcPath + "/css/*.css"
      ])
      .pipe(concatCss('animate.css'))
      .pipe(concatCss('styles.css'))
      .pipe(gulp.dest(distPath));
});

gulp.task('clear', function() {
  return rimraf.sync(distPath);
});

gulp.task('copy', function() {
  gulp.src(srcPath + "/img/**/*.*").pipe(gulp.dest(distPath + "/img"));
  gulp.src(srcPath + "/img/*.*").pipe(gulp.dest(distPath + "/img"));
  gulp.src(srcPath + "/css/glyphicons/*.*").pipe(gulp.dest(distPath + "/glyphicons"));
  gulp.src(srcPath + "/css/font-awesome/*.*").pipe(gulp.dest(distPath + "/font-awesome/fonts"));
  return gulp.src(srcPath + "/*.html").pipe(gulp.dest(distPath));
});

gulp.task('server', function() {
  return nodemon({
      script: serverMain,
    watch: [serverMain],
    execMap: {
        "js": "node --harmony"
    },
    env: {
        PORT: process.env.PORT || 4200
    }
  });
});

gulp.task('refresh', ['copy'], function() {
  livereload.listen();
  gulp.watch([distPath + "/**/*"]).on('change', livereload.changed);
  gulp.watch((srcPath + "/css/*.css"), ['style']);
  return gulp.watch([srcPath + "/**/*.html"], ['copy']);
});

gulp.task('build', ['clear', 'copy', 'style', 'jsbundle']);

gulp.task('default', ['clear', 'copy', 'style', 'server', 'jswatch', 'refresh']);
