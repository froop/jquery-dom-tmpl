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

	/**
	 * Bind value to Elements.
	 * @param {*} value in String or Number or only checkbox can Boolean or Array
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplBindValue = function (value) {
		var $fields = this;
		$fields.filter("input,select,textarea").not(":checkbox,:radio").val(value);
		if (typeof value === "boolean") {
			$fields.filter(":checkbox,:radio").prop("checked", value);
		} else {
			$fields.filter(":checkbox").val(value);
			$fields.filter(":radio").val([value]);
		}
		$fields.not("input,select,textarea").text(value);
		return this;
	};

	/**
	 * Element to value.
	 * @param {*} template value type in String (<code>""</code>) or
	 *                Number (<code>0</code>) or only checkbox can
	 *                Boolean (<code>false</code>) or Array (<code>[]</code>)
	 * @returns {Object} value
	 */
	$.fn.tmplUnbindValue = function (template) {
		var $field = this;
		if ($field.length > 1 && !$field.is(":checkbox,:radio")) {
			throw new Error("[" +
					($field.attr("name") || $field.attr("id") || $field.attr("class")) +
					"] is length=" + $field.length);
		}

		if ($field.is(":checkbox,:radio")) {
			if (typeof template === "boolean") {
				return $field.prop("checked");
			} else if ($.isArray(template)) {
				return $field.filter(":checked").map(function () {
					return $(this).val();
				}).get();
			} else {
				return $field.filter(":checked").val();
			}
		} else if ($field.is("input,select,textarea")) {
			return $field.val();
		} else {
			return $field.text();
		}
	};

	function setupListTmpl($elem) {
		var $tmpl = $elem.data("domtmpl");
		if (!$tmpl) {
			$tmpl = $elem.children().clone();
			$elem.data("domtmpl", $tmpl);
			$elem.empty();
		}
		return $tmpl;
	}

	function bindItem($elements, data, options) {
		function wrap$() {
			return $elements
					.wrapAll("<div class='wrapper'>")
					.closest(".wrapper");
		}
		wrap$().tmplBind(data, options);
	}

	function callIfFunction(target, argument) {
		if ($.isPlainObject(target)) {
			return null;
		} else if ($.isFunction(target)) {
			return target(argument);
		} else {
			return target;
		}
	}

	function defaultFind(name) {
		var selId = "#" + name;
		var selClass = "." + name;
		var selName = "[name=" + name + "]";
		return [selId, selClass, selName].join(",");
	}

	function find$ByName($elements, name, selector) {
		selector = callIfFunction(selector, $elements);
		return $elements.find(selector || defaultFind(name));
	}

	/**
	 * Bind data to DOM.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplBind = function (data, options) {
		data = data || {};
		var $elements = this;
		var defaults = {
			find: {},
			convertCallbacks: {},
			bindCallback: function ($targets, value, name) {
				$targets.tmplBindValue(value);
			},
			error: false // if element not exists then throw error.
		};
		var setting = $.extend(defaults, options);

		function bindValue($targets, name, value) {
			var convertCallbacks = setting.convertCallbacks[name];
			if (convertCallbacks) {
				value = convertCallbacks(value);
			}
			setting.bindCallback($targets, value, name);
		}

		$.each(data, function (name, value) {
			var $targets = find$ByName($elements, name, setting.find[name]);
			if (setting.error && $targets.length === 0) {
				throw new Error("tmplBind: not exists element [" + name + "]");
			}

			if ($.isPlainObject(value)) {
				$targets.tmplBind(value, options);
			} else {
				bindValue($targets, name, value);
			}
		});
		return this;
	};

	/**
	 * DOM to JSON.
	 * @param {Object} template of JSON
	 * @param {Object} options
	 * @returns {Object} JSON
	 */
	$.fn.tmplUnbind = function (template, options) {
		var $elements = this;
		var defaults = {
			find: {},
			convertCallbacks: {},
			unbindCallback: function ($target, template, name) {
				return $target.tmplUnbindValue(template);
			},
			error: false // if element not exists then throw error.
		};
		var setting = $.extend(defaults, options);
		var ret = {};

		function unbindValue($target, name, template) {
			var convertCallbacks = setting.convertCallbacks[name];
			var value = setting.unbindCallback($target, template, name);
			if (convertCallbacks) {
				value = convertCallbacks($target.val());
			}
			if (typeof template === "number" && $.isNumeric(value)) {
				value = Number(value);
			}
			return value;
		}

		$.each(template, function (name, value) {
			var $target = find$ByName($elements, name, setting.find[name]);
			if (setting.error && $target.length === 0) {
				throw new Error("tmplUnbind: not exists element [" + name + "]");
			}

			if ($.isPlainObject(value)) {
				ret[name] = $target.tmplUnbind(value);
			} else {
				ret[name] = unbindValue($target, name, value);
			}
		});
		return ret;
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
	 * Clone list item and bind data.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} appended item
	 */
	$.fn.tmplItem = function (data, options) {
		var $list = this;
		var $tmpl = setupListTmpl($list);
		return $tmpl.tmplClone(data, options);
	};

	/**
	 * Append list item and bind data.
	 * @param {Object} data JSON object
	 * @param {Object} options
	 * @returns {jQuery} appended item
	 */
	$.fn.tmplAppend = function (data, options) {
		var $list = this;
		var $item = $list.tmplItem(data, options);
		$list.append($item);
		return $item;
	};

	/**
	 * Bind array of data to list items.
	 * @param {Array} dataList List of JSON object
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplList = function (dataList, options) {
		dataList = dataList || [];
		this.each(function () {
			var $elem = $(this);
			setupListTmpl($elem);
			$elem.empty();
			$.each(dataList, function () {
				$elem.tmplAppend(this, options);
			});
		});
		return this;
	};

	/**
	 * Bind array of value-text to select options (or :radio, :checkbox).
	 * @param {Array} dataList List of JSON object (value, text)
	 * @param {Object} options
	 * @returns {jQuery} for method chain
	 */
	$.fn.tmplSelectOpts = function (dataList, options) {
		dataList = dataList || [];
		var $elements = this;
		var defaults = {
			canEmpty: false,
			emptyText: ""
		};
		var setting = $.extend(defaults, options);
		function isSelect($elem) {
			return $elem.find("option").length > 0;
		}

		if (setting.canEmpty) {
			dataList.unshift({
				value: "",
				text: setting.emptyText
			});
		}
		$elements.tmplList(dataList, {
			find: {
				value: function ($elem) {
					return isSelect($elem) ? "option" : "input";
				},
				text: function ($elem) {
					return isSelect($elem) ? "option" : "label";
				}
			},
			bindCallback: function ($elem, value, name) {
				if (name === "value") {
					$elem.attr("value", value);
				} else {
					$elem.tmplBindValue(value);
				}
			},
			error: true
		});
		return this;
	};
})(jQuery);
