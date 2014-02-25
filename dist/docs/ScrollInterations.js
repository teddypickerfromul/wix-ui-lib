DocsApp.Classes.ScrollInterations = function () {
	
	var dataInter = '[data-scroll-inter]';
	var dataTarget = '[data-scroll-target]';
	var currentViewed = 'current-viewed';
	var $win = $(window);
	var $doc = $(document);	
	var $body = $('body');
	var noScroll = false;

	return {
		mixin: function(obj){
			if(obj.bindScrollAnimation || obj.bindScrollInteraction || obj.bindHeaderScroll){
				throw new Error('Object is already implements ScrollInterations');
			}
			obj.bindScrollAnimation = this.bindScrollAnimation;
			obj.bindScrollInteraction = this.bindScrollInteraction;
			obj.bindHeaderScroll = this.bindHeaderScroll;
		},
		bindScrollAnimation : function () {
			$body.on('click', dataInter, function (evt) {
				evt.preventDefault();
				var id = evt.target.getAttribute('href');
				if (evt.target.hasAttribute('data-no-scroll')){
					noScroll = true;
					$('[href]').removeClass(currentViewed);
				} else {
					noScroll = false;
				}
                $body.animate({
					scrollTop : $(id).offset().top
                }, 250, function () {
					window.location.hash = id;
				});
			});

			setTimeout(function(){
				$(".js-sidebar").stick_in_parent({offset_top: 80});
			}, 100);

			$(".js-back-to-top").on('click', function(){
				$body.animate({
					scrollTop : 0
				}, 260);
			});


		},

		bindHeaderScroll : function(){
			var navPos = $('.page-welcome').height() - 50;
			$win.resize(function() {
				$('.navigation').toggleClass('shown', $doc.scrollTop() >= navPos);
			});
			$doc.bind('scroll touchmove', function() {
				$('.navigation').toggleClass('shown', $doc.scrollTop() >= navPos);

				$(".js-back-to-top").toggleClass('shown', $doc.scrollTop() >= navPos);
			});
		},

		bindScrollInteraction : function() {
			var $inter = $(dataInter);
			var allHashes = $(dataTarget).toArray();
            var tollerace = 30;
			var winScrollTop = $win.scrollTop();
			var timeout;
			var _winScrollTop;
			var dir = 0;
			var UP = 1
			var DOWN = -1
			var updateDirectionAndCurrentWinScroll = function () {
				_winScrollTop = $win.scrollTop();
				dir = winScrollTop >= _winScrollTop ? UP : DOWN;
				winScrollTop = _winScrollTop;
			};
			var findElementOverTheScroll = function () {
				updateDirectionAndCurrentWinScroll();
				var elements = allHashes.filter(function (el, i) {
					var currentElementTop = $(el).position().top;
					if (dir === UP) {
						return winScrollTop > (currentElementTop - ($(allHashes[i - 1]).height() / 2 || 0));
					} else {
						return winScrollTop + tollerace > currentElementTop;
					}
				});
				return elements.pop();
			};
			var updateCss = function (el) {
                $inter.parent().removeClass(currentViewed);
                $('ul.nav').hide();
                if (el) {
                    var $elm = $('[href="#' + el.id + '"]');
                    $elm.parent().addClass(currentViewed);
                    $elm.parent().find('ul.nav').show();
                    $elm.closest('ul.nav').show();
				}
			}
			$win.scroll(function (evt) {
				clearTimeout(timeout);
				timeout = setTimeout(function () {
						if(noScroll) return;
						var element = findElementOverTheScroll();
						updateCss(element);
					}, 20);
			});
		}
	};
}
