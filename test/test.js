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

	test("tmplUnbind", function () {
		function deleteComma(str) {
			return new String(str).replace(/,/g, "");
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
})(jQuery);
