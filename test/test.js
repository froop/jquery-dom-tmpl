(function ($) {
	"use strict";

	module("domtmpl", {
		setup: function () {
			$("#qunit-fixture").load("example.html #example");
		}
	});

	test("dummy", function () {
		ok(true);
	});
})(jQuery);
