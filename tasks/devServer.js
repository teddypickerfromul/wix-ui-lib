module.exports = function(grunt) {
	var express = require("express");
	grunt.registerTask("server", "static file development server", function() {
		var app, webPort, webRoot, distRoot;
		webPort = grunt.config.get("server.web.port") || 8000;
		webRoot = grunt.config.get("server.base") || "dev";
		distRoot = grunt.config.get("server.dist") || "dist";

		app = express();
		app.use(express.static("" + (process.cwd()) + "/" + webRoot));
		app.use("/images", express.static("" + (process.cwd()) + "/images"));
        app.use("/dist", express.static("" + (process.cwd()) + "/"  + distRoot));

		app.use(express.errorHandler());
		app.listen(webPort);

		grunt.log.writeln("Starting express web server in \"./dev\" on port " + webPort);

		return app;
	});
};