module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd h:MM") %> */\n',
    
    //clean the output folder and unused css files
    clean: {
      output : {
        src: ["dist"]
      }
    },

    //move all js and font source files to the dist folder
    copy: {
      main: {
        files: [
          {expand: true, src: ['src/js/*'], dest: 'dist/js/', filter: 'isFile', flatten: true},
          {expand: true, src: ['src/fonts/*'], dest: 'dist/fonts/', filter: 'isFile', flatten: true}
        ]
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      build: {
        src: 'dist/js/bootcards.js',
        dest: 'dist/js/bootcards.min.js'
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          src: ['src/css/bootcards-android.scss', 'src/css/bootcards-desktop.scss', 'src/css/bootcards-ios.scss'],
          dest: 'dist/css',
          ext: '.css',
          flatten: true
        }]
      }
    },

    cssmin: {
      minify : {
        options: { banner: '<%= banner %>' },
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },

     watch : {
      scripts: {
        files: ['**/*.js', '**/*.scss'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      }
    }

  });

  //load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', [
    'clean:output',
    'copy',
    'uglify',
    'sass',
    'cssmin:minify'
    ]);

};