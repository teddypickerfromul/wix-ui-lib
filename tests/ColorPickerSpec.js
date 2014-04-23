describe('ColorPickers', function () {
	'use strict';
	
	var async = new AsyncSpec(this);
	
	function createPlugin(setup) {
		var $el = $('<div>');
		$el.attr('wix-ctrl', setup.ctrl);
		setup.model && $el.attr('wix-model', setup.model);
		setup.param && $el.attr('wix-param', setup.param);
		setup.options && $el.attr('wix-options', JSON.stringify(setup.options));
		Wix.UI.initializePlugin($el[0]);
		return $el;
	}
	
	describe('ColorPicker', function () {

		it('should set the initial value (Model Flow)', function () {

			var $el = createPlugin({
					ctrl : 'ColorPicker',
					model : 'color',
					options : {
						value : '#000'
					}
				});

			$el.appendTo('body');
			
			var color = $el.ColorPicker('getValue');
			var color2 = Wix.UI.get('color');
			
			expect(color).toBe('rgb(0,0,0)');
			expect(color).toBe(color2);
			
			Wix.UI.destroy($el, true);
			
		});
		
		async.xit('should initialized with Editor Colors (Using Mock)', function (done) {

			var $el = createPlugin({
					ctrl : 'ColorPicker',
					param : 'color',
					appendTo:'body',
					options : {
						value : 'color-1'
					}
				});

			$el.appendTo('body');
			$el.click();
			//$el.find('.simple-color-node').filter(':not(.color-node-selected)').eq(0).click();
			Wix.UI.Styles.set('color', 'color-2');
			
			
			
			setTimeout(function(){
				var color = Wix.UI.Styles.get('color');
				expect(color.cssColor).toBe('#666');
				expect(color.color.reference).toBe('color-2');
				Wix.UI.destroy($el, true);
				done();
			},4500)
			
		},50000000);

        it('should have only one color picker popup open at a time', function() {
            var oldPopups = $(".uilib-popup");

            var $el = createPlugin({
                ctrl : 'ColorPicker',
                model : 'color',
                options : {
                    value : '#000'
                }
            });

            $el.appendTo('body');
            $el.click();

            waitsFor(function () {
                return $el.find(".uilib-popup").length > 0;
            }, "The popup is not shown", 500);

            runs(function () {
                //make sure all old popups are hidden
                _.each(oldPopups, function (popup) {
                    expect($(popup).css('display')).toBe('none');
                });

                expect($el.find(".uilib-popup").css('display')).toBe('block');
            });

            Wix.UI.destroy($el, true);
        });
	});
	
	describe('ColorPickerWithOpacity', function () {

		it('should set the initial value (Model Flow)', function () {
		
			var $el = createPlugin({
					ctrl : 'ColorPickerWithOpacity',
					model : 'color',
					options : {
						value : '#000'
					}
				});

			$el.appendTo('body');
					
			var color = $el.ColorPickerWithOpacity('getValue');
			var color2 = Wix.UI.get('color');
			
			expect(color).toBe('rgba(0,0,0,1)');
			expect(color).toBe(color2);

			Wix.UI.destroy($el, true);
			
		});
		
		it('should set the initial value with opacity (Model Flow)', function () {
			var $el = createPlugin({
					ctrl : 'ColorPickerWithOpacity',
					model : 'color',
					options : {
						value : '#000',
						startWithOpacity: 50
					}
				});

			$el.appendTo('body');
					
			var color = $el.ColorPickerWithOpacity('getValue');
			var color2 = Wix.UI.get('color');
			
			expect(color).toBe('rgba(0,0,0,0.5)');
			expect(color).toBe(color2);
			
			Wix.UI.destroy($el, true);
			
		});
		
		it('should set the initial value from rgba color (Model Flow)', function () {
			var $el = createPlugin({
					ctrl : 'ColorPickerWithOpacity',
					model : 'color',
					options : {
						value : 'rgba(1,2,3,0.4)'
					}
				});
				
			$el.appendTo('body');
		
			var color = $el.ColorPickerWithOpacity('getValue');
			var color2 = Wix.UI.get('color');
			
			expect(color).toBe('rgba(1,2,3,0.4)');
			expect(color).toBe(color2);
		
			Wix.UI.destroy($el, true);
			
		});
			
		it('should set the initial value from rgba color and opacity should override it (Model Flow)', function () {
			var $el = createPlugin({
					ctrl : 'ColorPickerWithOpacity',
					model : 'color',
					options : {
						value : 'rgba(1,2,3,0.4)',
						startWithOpacity: 100
					}
				});

			$el.appendTo('body');
					
			var color = $el.ColorPickerWithOpacity('getValue');
			var color2 = Wix.UI.get('color');
			
			expect(color).toBe('rgba(1,2,3,1)');
			expect(color).toBe(color2);
			
			Wix.UI.destroy($el, true);
			
		});
	});

});

