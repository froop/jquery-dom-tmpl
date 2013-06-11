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
		equal($("[name=checkbox2]:checked:eq(0)").val(), "c1");
		equal($("[name=checkbox2]:checked:eq(1)").val(), "c3");
		equal($("#custom11").text(), "alt1");
		equal($("[name=custom12]").val(), "alt1");
		equal($("#custom21").text(), "alt21");
		equal($("#custom21").attr("href"), "http://google.co.jp/");
		equal($("#custom2 > input").val(), "alt22");
		ok($("#custom2 > input").prop("disabled"));
		equal($("#nest11").text(), "nested text");
	});

	test("tmplUnbind", function () {
		function deleteComma(str) {
			return String(str).replace(/,/g, "");
		}
		var res = $("#direct-bind").tmplUnbind({
			text1: "",
			text2: "",
			input1: "",
			input2: 0,
			checkbox1: false,
			textarea1: "",
			select1: "",
			radio1: "",
			checkbox2: [],
			alternate1: "",
			alternate21: "",
			alternate22: "",
			nest1: {
				nest11: ""
			}
		}, {
			find: {
				alternate1: "[name=custom12]",
				alternate21: "#custom21",
				alternate22: "#custom2 > input"
			},
			convertCallback: function (value, name) {
				if (name === "input2") {
					return deleteComma(value);
				} else {
					return value;
				}
			},
			error: true
		});

		deepEqual(res, {
			text1: "root element",
			text2: "child element",
			input1: "input text",
			input2: 1234,
			checkbox1: true,
			textarea1: "textarea11\ntextarea12",
			select1: "s1",
			radio1: "r1",
			checkbox2: ["c1", "c3"],
			alternate1: "alt1",
			alternate21: "alt21",
			alternate22: "alt22",
			nest1: {
				nest11: "nested text"
			}
		});
	});

	test("tmplUnbind not number input", function () {
		var res = $("#direct-bind").tmplUnbind({
			input1: 0,
			nullnum1: 0
		}, {
			error: true
		});

		deepEqual(res, {
			input1: "input text",
			nullnum1: ""
		});
	});

	test("tmplSelectOpts select", function () {
		var $target = $("select[name=select1]");
		equal($target.find("option").length, 3);
		equal($target.find("option:eq(0)").val(), "");
		equal($target.find("option:eq(0)").text(), "");
		equal($target.find("option:eq(1)").val(), "s1");
		equal($target.find("option:eq(1)").text(), "select11");
		equal($target.find("option:eq(2)").val(), "s2");
		equal($target.find("option:eq(2)").text(), "select12");
	});

	test("tmplSelectOpts radio", function () {
		var $target = $("#radios");
		equal($target.find("span").length, 3);
		equal($target.find("span:eq(0) input").val(), "");
		equal($target.find("span:eq(0) label").text(), "none");
		equal($target.find("span:eq(1) input").val(), "r1");
		equal($target.find("span:eq(1) label").text(), "radio11");
		equal($target.find("span:eq(2) input").val(), "r2");
		equal($target.find("span:eq(2) label").text(), "radio12");
	});

	test("tmplSelectOpts checkbox", function () {
		var $target = $("#checks");
		equal($target.find("span").length, 3);
		equal($target.find("span:eq(0) input").val(), "c1");
		equal($target.find("span:eq(0) label").text(), "check21");
		equal($target.find("span:eq(1) input").val(), "c2");
		equal($target.find("span:eq(1) label").text(), "check22");
		equal($target.find("span:eq(2) input").val(), "c3");
		equal($target.find("span:eq(2) label").text(), "check23");
	});

	test("tmplInit", function () {
		var $target = $("#init-bind");
		equal($target.find("#elem1").text(), "elem1 b");
		equal($target.find("#elem2").text(), "elem2 b");
		equal($target.find("#elem3").text(), "");
	});
})(jQuery);
