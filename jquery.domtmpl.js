/*
 * jquery.domtmpl.js - jQuery plugin.
 *
 * DOM based HTML template engine.
 *
 * Created by froop http://github.com/froop/jquery-dom-tmpl
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	function setValue($fields, value) {
		$fields.filter("input,select").not(":checkbox,:radio").val(value);
		if (typeof value === "boolean") {
			$fields.filter(":checkbox,:radio").prop("checked", value);
		} else {
			$fields.filter(":checkbox").val(value);
			$fields.filter(":radio").val([value]);
		}
		$fields.not("input,select").text(value);
	}

	function setupListTmpl($elem) {
		var $tmpl = $elem.data("domtmpl");
		if (!$tmpl) {
			$tmpl = $elem.children().clone();
			$elem.data("domtmpl", $tmpl);
			$elem.empty();
		}
		return $tmpl;
	}

	function renderList($elements, data, renderItem, options) {
		$elements.each(function () {
			var $elem = $(this);
			var $tmpl = setupListTmpl($elem);

			$elem.empty();
			$.each(data, function () {
				var $item = $tmpl.clone();
				renderItem($item, this, options);
				$elem.append($item);
			});
		});
	}

	function bindItem($elements, data, options) {
		function wrap$() {
			return $elements
					.wrapAll("<div class='wrapper'>")
					.closest(".wrapper");
		}
		wrap$().tmplBind(data, options);
	}

	/**
	 * Bind data to DOM.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplBind = function (data, options) {
		var $elements = this;
		var defaults = {
				selector: {},
				attr: {},
				prop: {}
		};
		var setting = $.extend(defaults, options);

		$.each(data, function (name, value) {
			function defaultSelector() {
				var selId = "#" + name;
				var selClass = "." + name;
				var selName = "[name=" + name + "]";
				return [selId, selClass, selName].join(",");
			}

			var selector = setting.selector[name];
			var attr = setting.attr[name];
			var prop = setting.prop[name];
			var $target = $elements.find(selector || defaultSelector());

			if (attr) {
				$target.attr(attr, value);
			} else if (prop) {
				$target.prop(prop, value);
			} else {
				setValue($target, value);
			}
		});
		return this;
	};

	/**
	 * Clone and bind data to DOM.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} cloned element
	 */
	$.fn.tmplClone = function (data, options) {
		var $item = this.clone();
		bindItem($item, data, options);
		return $item;
	};

	/**
	 * Append list item and bind data.
	 * @param {Object} data JSON object
	 * @returns {jQuery} appended item
	 */
	$.fn.tmplAppend = function (data) {
		var $elem = this;
		var $tmpl = setupListTmpl($elem);
		var $item = $tmpl.tmplClone(data);
		$elem.append($item);
		return $item;
	};

	/**
	 * Bind array of value-text to select options (or :radio, :checkbox).
	 * @param {Array} dataList List of JSON object (value, text)
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplSelectOpts = function (dataList) {
		var $elements = this;
		renderList($elements, dataList, function ($item, data) {
			if ($item.is("option")) {
				$item.val(data.value).text(data.text);
			} else {
				$item.find("input").val(data.value);
				$item.find("label").text(data.text);
			}
		});
		return this;
	};

	/**
	 * Bind array of data to list items.
	 * @param {Array} dataList List of JSON object
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplList = function (dataList, options) {
		var $elements = this;
		renderList($elements, dataList, bindItem, options);
		return this;
	};
})(jQuery);
