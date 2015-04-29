module.exports = function(grunt) {
	grunt.initConfig({
		update: {
			file: '../config.js',
			template: '../config.tpl',
			format: 'yyyy-mmdd-HHMM'
		},
		transport: {
			app: {
				options: {
					paths: ['app'],
					idleading: '/app/'
				},
				files: [{
					expand: true,
					cwd: 'app',
					src: '**/*.js',
					dest: '.build'
				}]
			}
		},
		concat: {
			app: {
				src: ['.build/**/*.js'],
				filter: function(path) {
					if (/^.*[\/\\].+-debug\.js/.test(path)) {
						return false;
					}
					return true;
				},
				dest: ".build/app.pack.js"
			}			
		},
		uglify: {
			app: {
				src: '.build/app.pack.js',
				dest: 'dist/app.pack.min.js'
			},
			cocos: {
				src: 'lib/cocos2d-js-v3.3.js',
				dest: 'lib/cocos2d-js-v3.3.min.js'
			}
		},
		clean: {
			build: ['.build']			
		}
	});

	grunt.loadNpmTasks('grunt-cmd-transport');
	//合并CMD模块使用 grunt-cmd-concat
	grunt.loadNpmTasks('grunt-cmd-concat');
	//普通文件合并使用 grunt-contrib-concat
	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['transport:app', 'concat:app', 'uglify:app', 'clean']);
	grunt.registerTask('update', 'update version file', function() {
		var template = grunt.file.read(grunt.config('update.template'));
			data = {
				version: grunt.template.today(grunt.config('update.format'))
			};
		grunt.file.write(grunt.config('update.file'), grunt.template.process(template, {data:data}));
	});
};