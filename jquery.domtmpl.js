/*
 * jquery.domtmpl.js - jQuery plugin.
 *
 * Depend on Transparency library (https://github.com/leonidas/transparency)
 *
 * Created by froop http://github.com/froop/jquery-dom-tmpl
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery, Transparency */
(function ($) {
	"use strict";

	function toRadioValue($elements, data) {
		//dummy
		return data;
	}

	/**
	 * Clone and bind array of data to DOM.
	 * @param {Array} data JSON object
	 */
	$.fn.tmplList = function (data) {
		var $elements = this;
		var renderArray = [];

		$.each(data, function () {
			renderArray.push(toRadioValue($elements, this));
		})

		$elements.render(renderArray);
		return this;
	};

	/**
	 * Bind data to DOM.
	 * @param {Object} data JSON object
	 */
	$.fn.tmplBind = function (data) {
		var $elements = this;

		$elements.each(function () {
			var $elem = $(this);

			function setValue($fields, value) {
				$fields.filter("input,select").val(value); //TODO checkbox, radio
				$fields.not("input,select").text(value);
			}

			$.each(data, function (name) {
				var selId = "#" + name;
				var selClass = "." + name;
				var selName = "[name=" + name + "]";
				var selector = selId + "," + selClass + "," + selName;
				setValue($elem.find(selector), data[name]);
			});
		});

		return this;
	};

	/**
	 * Clone and bind data to DOM.
	 * @param {Object} data JSON object
	 */
	$.fn.tmplClone = function (data) {
		var $wrapper = this.clone()
				.wrapAll("<div class='wrapper'>")
				.closest(".wrapper");
		$wrapper.tmplBind(data);
		return $wrapper.children();
	};

	/**
	 * Clone <option> and bind data to <select>.
	 * @param {Array} data List of JSON object
	 */
	$.fn.tmplSelectOpts = function (data) {
		var $elements = this;

		$elements.each(function () {
			var $elem = $(this);
			var $tmpl = $elem.data("domtmpl");

			if (!$tmpl) {
				$tmpl = $elem.children().clone();
				$elem.data("domtmpl", $tmpl);
			}

			$elem.empty();
			$.each(data, function () {
				var $opt = $tmpl.clone();
				$opt.val(this.value).text(this.text);
				$elem.append($opt);
			});
		});

		return this;
	};
})(jQuery);
