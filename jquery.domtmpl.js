/*
 * jquery.domtmpl.js - jQuery plugin.
 *
 * Created by froop http://github.com/froop/jquery-dom-tmpl
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery, Transparency */
(function ($) {
	"use strict";

	function setValue($fields, value) {
		$fields.filter("input,select").not(":checkbox,:radio").val(value);
		$fields.filter(":checkbox").prop("checked", value);
		$fields.filter(":radio").val([value]);
		$fields.not("input,select").text(value);
	}

	function setupListTmpl($elem) {
		var $tmpl = $elem.data("domtmpl");
		if (!$tmpl) {
			$tmpl = $elem.children().clone();
			$elem.data("domtmpl", $tmpl);
		}
		return $tmpl;
	}

	function renderList($elements, data, renderItem) {
		$elements.each(function () {
			var $elem = $(this);
			var $tmpl = setupListTmpl($elem);

			$elem.empty();
			$.each(data, function () {
				var $item = $tmpl.clone();
				renderItem($item, this);
				$elem.append($item);
			});
		});
	}

	/**
	 * Clone and bind array of data to DOM.
	 * @param {Array} data JSON object
	 */
	$.fn.tmplList = function (data) {
		var $elements = this;
		var renderArray = [];

		$.each(data, function () {
			renderArray.push(this);
		})

		$elements.render(renderArray); //TODO
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
		renderList($elements, data, function ($item, data) {
			$item.val(data.value).text(data.text);
		});
		return this;
	};
})(jQuery);
