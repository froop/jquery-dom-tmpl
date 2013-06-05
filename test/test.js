(function ($) {
	"use strict";

	module("domtmpl", {
		setup: function () {
		}
	});

	test("tmplBind", function () {
		equal($("#text1").text(), "root element");
		equal($("#text2").text(), "child element");
		equal($("[name=input1]").val(), "input text");
		equal($("[name=input2]").val(), "1,234");
		ok($("[name=checkbox1]").prop("checked"));
		equal($("[name=textarea1]").val(), "textarea11\ntextarea12");
		equal($("[name=select1]").val(), "s1");
		equal($("[name=radio1]:checked").val(), "r1");
		equal($("[name=checkbox2]:checked").length, 2);
		equal($($("[name=checkbox2]:checked").get(0)).val(), "c1");
		equal($($("[name=checkbox2]:checked").get(1)).val(), "c3");
		equal($("#custom11").text(), "alt1");
		equal($("[name=custom12]").val(), "alt1");
		equal($("#custom21").text(), "alt21");
		equal($("#custom21").attr("href"), "http://google.co.jp/");
		equal($("#custom2 > input").val(), "alt22");
		ok($("#custom2 > input").prop("disabled"));
		equal($("#nest11").text(), "nested text");
	});
})(jQuery);
