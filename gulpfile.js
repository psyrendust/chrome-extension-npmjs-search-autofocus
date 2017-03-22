const crx = require('gulp-crx-pack');
const fs = require('fs');
const gulp = require('gulp');

const name = 'npmjs-search-autofocus';

gulp.task('bundle', () => (
  gulp.src(`./${name}`)
    .pipe(crx({
      privateKey: fs.readFileSync(process.env.CHROME_WEB_STORE_KEY, 'utf8'),
      filename: `${name}.crx`,
    }))
    .pipe(gulp.dest('./dist'))
));

gulp.task('default', ['bundle']);
