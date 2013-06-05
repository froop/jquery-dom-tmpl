(function ($) {
	"use strict";

	module("domtmpl", {
		setup: function () {
		}
	});

	test("tmplBind", function () {
		equal("root element", $("#text1").text());
		equal("child element", $("#text2").text());
		equal("input text", $("[name=input1]").val());
		equal("1,234", $("[name=input2]").val());
		ok($("[name=checkbox1]").prop("checked"));
		equal("textarea11\ntextarea12", $("[name=textarea1]").val());
		equal("s1", $("[name=select1]").val());
		equal("r1", $("[name=radio1]:checked").val());
		equal(2, $("[name=checkbox2]:checked").length);
		equal("c1", $($("[name=checkbox2]:checked").get(0)).val());
		equal("c3", $($("[name=checkbox2]:checked").get(1)).val());
		equal("alt1", $("#custom11").text());
		equal("alt1", $("[name=custom12]").val());
		equal("alt21", $("#custom21").text());
		equal("http://google.co.jp/", $("#custom21").attr("href"));
		equal("alt22", $("#custom2 > input").val());
		ok($("#custom2 > input").prop("disabled"));
		equal("nested text", $("#nest11").text());
	});
})(jQuery);
