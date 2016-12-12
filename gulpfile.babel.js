import gulp from 'gulp'
import less from 'gulp-less'
import autoprefixer from 'gulp-autoprefixer'
import minifycss from 'gulp-minify-css'

const isDev = process.env.NODE_ENV === 'dev'
const isBuild = process.env.NODE_ENV === 'build'

const lessFileList = [
  './src/styles/index.less',
  './src/styles/article*.less'
]

gulp.task('less', () => {
  let pro = gulp.src(lessFileList)
    .pipe(less()).pipe(autoprefixer())

  if (isBuild) {
    pro = pro.pipe(minifycss())
  }
  pro.pipe(gulp.dest('./static/styles/css'))
})

gulp.task('build',['less'])

gulp.task('dev',['build'], () => {
  gulp.watch('./src/styles/**', ['build'])
})
