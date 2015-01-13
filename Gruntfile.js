module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd h:MM") %> */\n',
    
    clean: ["dist"],

    copy: {
      main: {
        files: [
          // includes files within path
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

    concat: {
      cssdesktoplite: {
        options: { banner: '<%= banner %>' },
        src: [
       'src/css/bootcards.css','src/css/bootcards-desktop.css'
       ],
       dest: 'dist/css/bootcards-desktop-lite.css'
      },
      cssioslite: {
        options: { banner: '<%= banner %>' },
         src: [
         'src/css/bootcards.css','src/css/bootcards-mobile-shared.css','src/css/bootcards-ios.css'
         ],
         dest: 'dist/css/bootcards-ios-lite.css'
      },
      cssandroidlite: {
        options: { banner: '<%= banner %>' },
         src: [
         'src/css/bootcards.css','src/css/bootcards-mobile-shared.css','src/css/bootcards-android.css'
         ],
         dest: 'dist/css/bootcards-android-lite.css'
      },
      cssdesktop: {
        options: { banner: '<%= banner %>' },
        src: [
       'bower_components/bootstrap/dist/css/bootstrap.min.css','dist/css/bootcards-desktop-lite.min.css'
       ],
       dest: 'dist/css/bootcards-desktop.min.css'
      },
      cssios: {
        options: { banner: '<%= banner %>' },
         src: [
         'bower_components/bootstrap/dist/css/bootstrap.min.css','dist/css/bootcards-ios-lite.min.css'
         ],
         dest: 'dist/css/bootcards-ios.min.css'
      },
      cssandroid: {
        options: { banner: '<%= banner %>' },
         src: [
         'bower_components/bootstrap/dist/css/bootstrap.min.css','dist/css/bootcards-android-lite.min.css'
         ],
         dest: 'dist/css/bootcards-android.min.css'
      }
    },

    replace : {

      imports : {
          src: [
            'dist/css/bootcards-android.css', 'dist/css/bootcards-ios.css'
          ],
          overwrite: true,
          replacements : [{
            from : /\@import\s\".*\"\;/, 
            to : ""
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
        files: ['**/*.js', '**/*.html', '**/*.css'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      }
    }

  });

  // Load the plugin that provides the "uglify"/ contat task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-text-replace');

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'copy',
    'uglify',
    'concat:cssdesktoplite','concat:cssioslite','concat:cssandroidlite', 
    'replace:imports',
    'cssmin:minify', 
    'concat:cssdesktop','concat:cssios','concat:cssandroid',]);

};