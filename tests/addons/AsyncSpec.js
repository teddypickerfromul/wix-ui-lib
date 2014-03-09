// Jasmine.Async, v0.1.0
// Copyright (c)2012 Muted Solutions, LLC. All Rights Reserved.
// Distributed under MIT license
// http://github.com/derickbailey/jasmine.async
//
// Modified to allow custom timeout @ Wix.
//
this.AsyncSpec = (function (global) {

	// Private Methods
	// ---------------

	function runAsync(block, time) {
		return function () {
			var done = false;
			var complete = function () {
				done = true;
			};

			runs(function () {
				block.call(this, complete);
			});

			waitsFor(function () {
				return done;
			}, time || null);
		};
	}

	// Constructor Function
	// --------------------

	function AsyncSpec(spec) {
		this.spec = spec;
	}

	// Public API
	// ----------

	AsyncSpec.prototype.beforeEach = function (block, time) {
		this.spec.beforeEach(runAsync(block, time));
	};

	AsyncSpec.prototype.afterEach = function (block, time) {
		this.spec.afterEach(runAsync(block, time));
	};

	AsyncSpec.prototype.it = function (description, block, time) {
		// For some reason, `it` is not attached to the current
		// test suite, so it has to be called from the global
		// context.
		global.it(description, runAsync(block, time));
	};

	AsyncSpec.prototype.xit = function () {};

	return AsyncSpec;
})(this);
