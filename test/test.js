(function ($) {
	"use strict";

	module("domtmpl", {
		setup: function () {
		}
	});

	test("tmplBind", function () {
		equal("root text", $("#text1").text());
	});
})(jQuery);
