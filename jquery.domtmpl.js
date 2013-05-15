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

	function bindItem($elements, data) {
		function wrap$() {
			return $elements
					.wrapAll("<div class='wrapper'>")
					.closest(".wrapper");
		}
		wrap$().tmplBind(data);
	}

	/**
	 * Bind data to DOM.
	 * @param {Object} data JSON object
	 */
	$.fn.tmplBind = function (data) {
		var $elements = this;
		$.each(data, function (name) {
			var selId = "#" + name;
			var selClass = "." + name;
			var selName = "[name=" + name + "]";
			var selector = selId + "," + selClass + "," + selName;
			setValue($elements.find(selector), data[name]);
		});
		return this;
	};

	/**
	 * Clone and bind data to DOM.
	 * @param {Object} data JSON object
	 */
	$.fn.tmplClone = function (data) {
		var $item = this.clone();
		bindItem($item, data);
		return $item;
	};

	/**
	 * Clone select option (or :radio, :checkbox) and bind array of value-text.
	 * @param {Array} dataList List of JSON object (value, text)
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
	 * Clone and bind array of data to DOM.
	 * @param {Array} dataList List of JSON object
	 */
	$.fn.tmplList = function (dataList) {
		var $elements = this;
		renderList($elements, dataList, bindItem);
		return this;
	};
})(jQuery);
