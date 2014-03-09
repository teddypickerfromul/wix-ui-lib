module.exports = function(grunt) {
	var _ = grunt.util._;
	grunt.registerTask("settings", "generates a settings html file for the project dev/dist directory", function(target) {
		var source, targetConfig, template;
		target = target || "dist";
		this.requiresConfig("settings.template");
		this.requiresConfig("settings." + target);
		template = grunt.config.get("settings.template");
		targetConfig = grunt.config.get("settings." + target);
		source = grunt.file.read(template);
		grunt.file.write(targetConfig.dest, _(source).template(targetConfig.context));
		grunt.log.writeln("Settings HTML written to '" + targetConfig.dest + "'");
	});
};