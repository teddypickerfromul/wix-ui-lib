module.exports = function(grunt) {
	var _ = grunt.util._;
	grunt.registerTask("docs", "generates an index html file for the project dev/dist directory", function(target) {
		var source, targetConfig, template;
		target = target || "dist";
		this.requiresConfig("docs.template");
		this.requiresConfig("docs." + target);
		template = grunt.config.get("docs.template");
		targetConfig = grunt.config.get("docs." + target);
		source = grunt.file.read(template);
		grunt.file.write(targetConfig.dest, _(source).template(targetConfig.context));
		grunt.log.writeln("Index HTML written to '" + targetConfig.dest + "'");
	});
};