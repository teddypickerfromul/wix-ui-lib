module.exports = function (grunt) {

	// Project configuration.
	var projectName = 'uiLib';
	var sourceDirectory = 'src/main/';
	var buildDirectory = 'build/' + projectName + '/src/main/';

	grunt.initConfig({
		pkg : grunt.file.readJSON('./package.json'),

		concat : {
			options : {
				separator : ';'
			},
			dist : {
				src : [
					'javascripts/bootstrap/bootstrap-tooltip.js',
					'javascripts/bootstrap/bootstrap-popover.js',
					'javascripts/components/**/*.js',
					'javascripts/ui-lib.js'
				],
				dest : 'build/<%= pkg.name %>.all.js'
			}
		},
		
		uglify : {
			options : {
				banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build : {
				src : [
					'javascripts/bootstrap/bootstrap-tooltip.js',
					'javascripts/bootstrap/bootstrap-popover.js',
					'javascripts/components/**/*.js',
					'javascripts/ui-lib.js'
				],
				dest : 'build/<%= pkg.name %>.min.js'
			}
		},
		cssmin : {
			add_banner : {
				options : {
					banner : '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
				},
				files : {
					'build/<%= pkg.name %>.min.css' : [
						'stylesheets/bootstrap.css',
						'stylesheets/buttons.css',
						'stylesheets/common.css',
						'stylesheets/settings.css',
						
						'javascripts/components/radio-button/radio-button.css',
						'javascripts/components/checkbox/checkbox.css',
						'javascripts/components/accordion/accordion.css',
						'javascripts/components/header/header.css',
						'javascripts/components/dropdown/dropdown.css',
						
						
						'javascripts/components/color-picker2/css/color-picker.css',
						'javascripts/components/advanced-dropdown/css/dd.css',
						'javascripts/components/slider2/slider2.css',
						'javascripts/components/glued-position/css/glued-position.css'

					]
				}
			}
		},
		copy : {
			main : {
				files : [{
						expand : true,
						cwd : 'images',
						src : ['**'],
						dest : 'build/images'
					}, // makes all src relative to cwd
					{expand: true, flatten: true,src: ['html/*.html'], dest: 'build/', filter: 'isFile'}, 
				]
			}
		},
		jshint : {
			all : {
				options : {
					// Unnecessary semicolon.
					"-W032": true,
					
					"asi" : true,
					"expr" : true,
					"laxcomma" : true,
					"smarttabs" : true,
					"curly" : true,
					"eqeqeq" : false,
					"immed" : true,
					"latedef" : true,
					"newcap" : true,
					"noarg" : true,
					"sub" : true,
					"es5" : true,
					"undef" : true,
					"eqnull" : true,
					"browser" : true,
					"regexdash" : true,
					"loopfunc" : true,
					"node":true,
					"globals" : {
						"Wix":true,
						"jQuery" : true,
						"$":true
					}
				},
				files : {
					src : [
						'javascripts/**/*.js', 
						'!**/~*.js', '!**/jquery.dd.js', 
						'!**/bootstrap-popover.js',
						'!**/bootstrap-tooltip.js'
					]
				}
			}
		},
		clean : ['build']

	});

	grunt.loadNpmTasks('grunt-contrib');

	// Default task.
	grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin']);
	grunt.registerTask('concatall', ['clean', 'copy', 'concat','uglify', 'cssmin']);
	grunt.registerTask('lint', ['jshint']);
};
