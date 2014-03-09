var DocsApp = {
	Classes:{},
	init : function () {
		this.templates = this.Classes.Templates();
		this.$components = $("#components");
		this.setAppElements();
		this.markup();
		this.bindEvents();
	},
	setAppElements : function () {
		this.$root = $('body');
		this.$sidebar = this.$components.find('.js-sidebar');
		this.$docs = this.$components.find('.js-docs');
	},
	markup : function () {
		this.updatePrettifyClasses();
		this.renderDocs();
	},
	updatePrettifyClasses:function(){
		$('.lang-html,.lang-javascript').each(function(){
			$(this).parents('pre').addClass('prettyprint linenums').css({
				padding: '5px',
				borderRadius:'4px'
			});
		})
		this.$docs.find('.content').find('.cmp-plugin-decs-entry').each(function(){			
			$(this).find('pre').addClass('plugin-markup prettyprint linenums');
		});
	},
	bindEvents : function () {
		this.Classes.ScrollInterations().mixin(this);
		this.bindScrollAnimation();
		this.bindScrollInteraction();
		this.bindHeaderScroll();
	},
	renderDocs : function () {
		var sidebarHTML = '';
		var that = this;
		$('#docs [data-scroll-target]').each(function(){
			sidebarHTML += that.templates.menuTpl({ name: $(this).attr('data-name'),
													id: $(this).attr('id')
			});
		});
		this.$sidebar.find('.content').append(sidebarHTML);
	}
};
