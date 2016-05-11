module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-env');
  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'app.js',
        ignore:  ['node_modules/**'],
        options: {
           delay: 20000
        }
      }
    },

    env : {
       src : ['credentials.json']
     }
  });

  grunt.registerTask('default', ['env', 'nodemon:dev']);
}