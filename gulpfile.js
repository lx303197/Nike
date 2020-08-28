var gulp = require('gulp')
var sass = require('gulp-sass');
var watch = require('gulp-watch');


//定义任务,将sass 转化为css
gulp.task('index',function(done){
    gulp.src('./sass/*.scss').pipe(sass()).pipe(gulp.dest('./css'))
    done()
})
gulp.task('login',function(done){
    gulp.src('./sass/login.scss').pipe(sass()).pipe(gulp.dest('./css/'))
})
gulp.task('cart',function(done){
    gulp.src('./sass/cart.scss').pipe(sass()).pipe(gulp.dest('./css/'))
})
gulp.task('details',function(done){
    gulp.src('./sass/details.scss').pipe(sass()).pipe(gulp.dest('./css/'))
})
gulp.task('signup',function(done){
    gulp.src('./sass/signup.scss').pipe(sass()).pipe(gulp.dest('./css/'))
})
gulp.task('amplifier',function(done){
    gulp.src('./sass/amplifier.scss').pipe(sass()).pipe(gulp.dest('./css/'))
})


gulp.task('watch',function(done){
    watch('./sass/index.scss',gulp.parallel('index'))
    watch('./sass/login.scss',gulp.parallel('login'))
    watch('./sass/cart.scss',gulp.parallel('cart'))
    watch('./sass/details.scss',gulp.parallel('details'))
    watch('./sass/signup.scss',gulp.parallel('signup'))
    watch('./sass/amplifier.scss',gulp.parallel('amplifier'))

    done()
})
