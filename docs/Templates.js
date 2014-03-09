DocsApp.Classes.Templates = function () {

	function menuTpl(Plugin) {
		return '<li class="cmp-plugin-entry">' +
		'<a data-scroll-inter href="#' + Plugin.id + '">' + Plugin.name + '</a>' +
		'<ul style="display:none" class=".nav">' +
		'<li><a href="#' + Plugin.id + '-examples">Examples</a></li>' +
		'<li><a href="#' + Plugin.id + '-usage">Usage</a></li>' +
		'</ul>' +
		'</li>';
	}

	return {
		menuTpl : menuTpl
	};
}
