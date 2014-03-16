(function ($, window, document, undefined) {
    'use strict';
		
    var pluginName = 'Scrollbar',
    defaults = {
            // width in pixels of the visible scroll area
            width : 'auto',
            // height in pixels of the visible scroll area
            height : '250px',
            // width in pixels of the scrollbar and rail
            size : '8px',
            // corner radius 
            radius: '4px',
            // scrollbar color, accepts any hex/color value
            color: '#a4d9fc',
             // scrollbar hober color, accepts any hex/color value
            hoverColor: '#35aeff',
            // sets scrollbar opacity
            hoverOpacity : 1,
            // scrollbar position - left/right
            position : 'right',
            // distance in pixels between the side edge and the scrollbar
            distance : '4px',
            // sets scrollbar opacity
            opacity : 1,
            // sets visibility of The rail
            railVisible : true,
            // sets rail color
            railColor : '#333',
            // sets rail opacity
            railOpacity : 0,
            // defautlt CSS class of the scroll rail
            railClass : 'uilib-scrollRail',
            // defautlt CSS class of the scroll bar
            barClass : 'uilib-scrollBar',
            // defautlt CSS class of the scroll wrapper
            wrapperClass : 'uilib-scrollDiv',
            // check if mousewheel should scroll the window if we reach top/bottom
            allowPageScroll : false,
            // scroll amount applied to each mouse wheel step
            wheelStep : 20,
            // scroll amount applied when user is using gestures
            touchScrollStep : 200,
            minBarHeight: 30,
            padding: '0 0 2px 0'
    };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.$el = $(element);
        this.options = $.extend({}, defaults, options);
		this.percentScroll = 0;
		this.lastScroll = undefined;
        this.markup();
        this.registerEvents();
        this.updateDisplay();
    };

	Plugin.prototype.scrollContent = function (y, isWheel, isJump) {
		var delta = y;
		var maxTop = this.$el.outerHeight() - this.$bar.outerHeight();

		if (isWheel) {
			// move bar with mouse wheel
			delta = parseInt(this.$bar.css('top')) + y * parseInt(this.options.wheelStep) / 100 * this.$bar.outerHeight();

			// move bar, make sure it doesn't go out
			delta = Math.min(Math.max(delta, 0), maxTop);

			// if scrolling down, make sure a fractional change to the
			// scroll position isn't rounded away when the scrollbar's CSS is set
			// this flooring of delta would happened automatically when
			// bar.css is set below, but we floor here for clarity
			delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);

			// scroll the scrollbar
			this.$bar.css({
				top : delta + 'px'
			});
		}

		// calculate actual scroll amount
		this.percentScroll = parseInt(this.$bar.css('top')) / (this.$el.outerHeight() - this.$bar.outerHeight());
		delta = this.percentScroll * (this.$el[0].scrollHeight - this.$el.outerHeight());

		if (isJump) {
			delta = y;
			var offsetTop = delta / this.$el[0].scrollHeight * this.$el.outerHeight();
			offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
			this.$bar.css({
				top : offsetTop + 'px'
			});
		}

		// scroll content
		this.$el.scrollTop(delta);

		// fire scrolling event
		this.$el.trigger('slimscrolling', ~~delta);

	}
	
    Plugin.prototype.markup = function() {

        var divS = '<div></div>';

        // wrap content
        var wrapper = $(divS)
            .addClass(this.options.wrapperClass)
            .css({
                position: 'relative',
                overflow: 'hidden',
                width: this.options.width,
                height: this.options.height,
				padding: this.options.padding
            });

        // update style for the div
        this.$el.css({
            overflow: 'hidden',
            width: this.options.width,
            height: this.options.height
        });

        // create scrollbar rail
        this.$rail = $(divS)
            .addClass(this.options.railClass)
            .css({
                width: this.options.size,
                position: 'absolute',
                height: '98%',
                top: 0,
                display: 'block',
                'border-radius': this.options.radius,
                background: this.options.railColor,
                opacity: this.options.railOpacity,
                zIndex: 999998
            });

        // create scrollbar
        var $bar = this.$bar = $(divS)
            .addClass(this.options.barClass)
            .css({
                background: this.options.color,
                width: this.options.size,
                position: 'absolute',
                top: 0,
                marginTop: '4px',
                opacity: this.options.opacity,
                display: 'block',
                'border-radius' : this.options.radius,
                BorderRadius: this.options.radius,
                MozBorderRadius: this.options.radius,
                WebkitBorderRadius: this.options.radius,
                zIndex: 999999,
                transition: 'background-color 200ms '
            });

        var that = this;
        wrapper.hover(function(event) {
            $bar.css({background: that.options.hoverColor, opacity: that.options.hoverOpacity});
        },function(event) {
            $bar.css({background: that.options.color, opacity: that.options.opacity});
        });

        // set position
        var posCss = (this.options.position == 'right') ? { right: this.options.distance } : { left: this.options.distance };
        this.$rail.css(posCss);
        this.$bar.css(posCss);

        // wrap it
        this.$el.wrap(wrapper);

        // append to parent div
        this.$el.parent().append(this.$bar);
        this.$el.parent().append(this.$rail);
    };

    Plugin.prototype.updateDisplay = function() {
        var display;
        // hide scrollbar if content is not long enough
		var barHeight = Math.max((this.$el.outerHeight() / this.$el[0].scrollHeight) * this.$el.outerHeight(), this.options.minBarHeight);
		barHeight = isFinite(barHeight) ? barHeight : parseInt(this.options.height, 10);
        if (barHeight >= this.$el.outerHeight()) {
            display =  'none';
        } else {
            display =  'block';
        }

        this.$bar.css({height:barHeight, display: display});
        this.$rail.css({height:'98%', display: display})

    };

    Plugin.prototype.registerEvents = function(){

        var plugin = this;
        var timeout;
        var $bar = this.$bar;
        var $rail = this.$rail;

        function callLaterToUpdateImages(time){
            clearTimeout(timeout);
            timeout = setTimeout(function(){
                plugin.$el.trigger('stopscrolling');
            }, time);
        }

        function doNothing(){return false}
				
		$(document.body).on('uilib-update-scroll-bars', function(){
			//plugin.getBarHeight();
			plugin.updateDisplay();
		});	
		
        this.$el.mousewheel(function(evt, delta){

            if ($bar.css('display') === 'none') return;
			evt.preventDefault();
            var speed = 10;
            var initPos = $bar.position().top;
            var pos = initPos - (delta * speed);
            var rh = $rail.height();
            var bh = $bar.height();

            pos = Math.min(pos, rh - bh);
            pos = Math.max(0, pos);
            $bar.css({
                top: pos
            });
            plugin.scrollContent(0, $bar.position().top, false);
            callLaterToUpdateImages(200);

        });

        this.$rail.on('click',function(evt){
            var rh = $rail.height();
            var bh = $bar.height();
            var initPos = $bar.position().top;
            var pos;
            if (initPos > evt.offsetY) {
                pos = Math.max(0, evt.offsetY);
            } else {
                pos = Math.min(evt.offsetY - bh, rh - bh);
            }

            $bar.css({
                top: pos
            });
            plugin.scrollContent(0, $bar.position().top, false);
            callLaterToUpdateImages(200);
        });



        this.$bar.on('mousedown', function(evt){

            document.body.focus();

            $(document).on('selectstart', doNothing);

            var initY = evt.clientY;
            var initPos = $bar.position().top;
            var rh = $rail.height();
            var bh = $bar.height();

            function mousemove_handler(evt){
                var currentY = evt.clientY - initY + initPos;

                var pos = Math.min(currentY, rh - bh);
                pos = Math.max(0, pos);
                $bar.css({
                    top: pos
                });
                plugin.scrollContent(0, $bar.position().top, false);
            }

            function mouseup_handler(evt){
                $(window).off('mousemove',mousemove_handler);
                $(window).off('mouseup',mouseup_handler);
                //TODO make an addEventListener
                $(document).off('selectstart', doNothing);

                callLaterToUpdateImages(200);
            }
            $(window).on('mousemove', mousemove_handler);
            $(window).on('mouseup', mouseup_handler);

        });

        // support for mobile
        this.$el.bind('touchstart', function(e,b){
            if (e.originalEvent.touches.length)
            {
                // record where touch started
                this._touchDif = e.originalEvent.touches[0].pageY;
            }
        });

        this.$el.bind('touchmove', function(e){
            // prevent scrolling the page
            e.originalEvent.preventDefault();
            if (e.originalEvent.touches.length)
            {
                // see how far user swiped
                var diff = (this._touchDif - e.originalEvent.touches[0].pageY) / this.options.touchScrollStep;
                // scroll content
                this.scrollContent(diff, true);
            }
        });
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);