jQuery.fn.definePlugin('Tooltip', function ($) {
	'use strict';

	var styles = {
		className: 'uilib-tooltip',
		textClassName: 'uilib-text',
		arrowClassName: 'arrow_box',
		arrowHeight: 12
	};
	var events = {
		mouseEnter: 'mouseenter',
		mouseLeave: 'mouseleave'
	};

	var placements = ['top', 'right', 'left', 'bottom'];

	return {
		init: function(){
			this.markup();
			this.bindEvents();
		},
		getDefaults: function(){
			return {
				placement : placements[0],
				text 	  : "", 
				html      : false,
				template  : '<div class=' + styles.className + '>' +
					'<div class=' + styles.arrowClassName + '>' +
					'<div class='+ styles.textClassName +'></div>' +
					'</div>' +
					'</div>',
				animation : true
			}
		},
		markup: function (){
		},
		bindEvents: function () {
			var tooltip = this;
			var $elm = tooltip.$el;
			$elm.on(events.mouseEnter, function (evt) {
				tooltip.remove();
				var $tooltip = $(tooltip.options.template);
				tooltip.setText($elm, $tooltip);

				$elm.after($tooltip);
				if($.inArray(tooltip.options.placement, placements) > - 1){
					switch(tooltip.options.placement){
						case 'top':
							setTopPlacement($tooltip);
							break;
						case 'right':
							setRightPlacement($tooltip);
							break;
						case 'left':
							setLeftPlacement($tooltip);
							break;
						case 'bottom':
							setBottomPlacement($tooltip);
							break;
						default :
							setTopPlacement($tooltip);
					}
				} else {
					setTopPlacement($tooltip);
				}
			});

			function setTopPlacement($tooltip){
				$tooltip.find('.' + styles.arrowClassName).addClass('down');
				$tooltip.css('left', $elm.position().left + calcOffsetLeft($tooltip));
				$tooltip.css('top', $elm.position().top - ($tooltip.outerHeight() + styles.arrowHeight));
			}

			function setBottomPlacement($tooltip){
				$tooltip.find('.' + styles.arrowClassName).addClass('up');
				$tooltip.css('left', $elm.position().left + calcOffsetLeft($tooltip));
				$tooltip.css('top', $elm.position().top + $elm.outerHeight() + styles.arrowHeight);
			}

			function setRightPlacement($tooltip){
				$tooltip.find('.' + styles.arrowClassName).addClass('left');
				$tooltip.css('left', $elm.position().left + $elm.outerWidth() + styles.arrowHeight);
				$tooltip.css('top', $elm.position().top + calcOffsetTop($tooltip));
			}

			function setLeftPlacement($tooltip){
				$tooltip.find('.' + styles.arrowClassName).addClass('right');
				$tooltip.css('left', $elm.position().left - ($tooltip.outerWidth() + styles.arrowHeight));
				$tooltip.css('top', $elm.position().top + calcOffsetTop($tooltip));
			}

			function calcOffsetLeft($tooltip){
				if($elm.outerWidth() > $tooltip.outerWidth()){
					var diff = $elm.outerWidth() - $tooltip.outerWidth();
					return diff/2;
				} else{
					var diff = $tooltip.outerWidth() - $elm.outerWidth();
					return -diff/2;
				}
			}

			function calcOffsetTop($tooltip){
				if($elm.outerHeight() > $tooltip.outerHeight()){
					var diff = $elm.outerHeight() - $tooltip.outerHeight();
					return diff/2;
				} else{
					var diff = $tooltip.outerHeight() - $elm.outerHeight();
					return -diff/2;
				}
			}

			$elm.on(events.mouseLeave, function (evt) {
				if(tooltip.options.animation){
					$("." + styles.className).fadeOut(function(){
						tooltip.remove();
					});
				} else{
					tooltip.remove();
				}
			});
		},
		getValue: function () {
			return "";
		},
		setValue: function (value) {
			"";
		},
		update: function () {
			return this;
		},
		remove: function(){
			$("." + styles.className).remove();
		},
		setText: function($elm, tooltipTpl) {
			var $toolTipTextEl = tooltipTpl.find("." + styles.textClassName);
			var toolTipValue = this.options.text || $elm.attr("wix-tooltip");
			if(this.options.html){
				$toolTipTextEl.html(toolTipValue);
			} else {
				$toolTipTextEl.text(toolTipValue);
			}
		}
	};
});

