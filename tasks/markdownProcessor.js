module.exports = function(grunt) {
    var _ = grunt.util._;
    grunt.registerTask('markdownProcessor', 'Generate html from give markdown files', function (task, target) {

        function getDocMdPluginContent(src, fileContent) {
            function getId(str) {
                var id = str.match(/<!--(.*)-->/);
                return id ? id[1].trim() : null;
            }
            function getName(str) {
                var name = str.match(/#(.*)/);
                return name ? name[1].trim() : null;
            }
            var id = getId(fileContent);
            if (!id) {
                grunt.log.error('Could not parse id form: ' + src);
            }
            var name = getName(fileContent);
            if (!name) {
                grunt.log.error('Could not parse name form: ' + src);
            }
            return {
                id : id,
                name: name
            }
        }

        var marked = require('marked');
        marked.setOptions({
            renderer : new marked.Renderer(),
            gfm : true
        });
        var done = this.async();

        var options = grunt.config.get(task + "." + target).options;
        var all = grunt.file.expand(options.files).map(function (filepath) {
            var fileContent = grunt.file.read(filepath);
            var plugin = getDocMdPluginContent(filepath, fileContent);
            grunt.log.ok('file: ' + filepath);
            return '<div data-scroll-target data-name="' + plugin.name + "\"" + 'id="' + plugin.id + '-entry" class="cmp-plugin-decs-entry">\n' + marked(fileContent) + '\n</div>';
        });

        var c = grunt.file.read(options.inject);
        c = c.replace(options.template, all.join('\n\n\n\n'));
        grunt.file.write(options.inject, c);

        done(true);

    });
};