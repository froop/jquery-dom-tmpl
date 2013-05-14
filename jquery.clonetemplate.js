/*
 * jquery.clonetemplate.js - jQuery plugin.
 *
 * Depend on Transparency library (https://github.com/leonidas/transparency)
 *
 * Created by froop http://github.com/froop/jquery-clone-template
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery, Transparency */
(function ($) {
	"use strict";

	var originalMatcher = Transparency.matcher;

	// The custom matcher gets Transparency `Element` wrapper with following properties
	// element.el:         Raw DOM element
	// element.name:       Lower-cased name of the DOM element, e.g., 'input'
	// element.classNames: List of class names of the DOM element, e.g., ['person', 'selected']
	Transparency.matcher = function(element, key) {
		var el = element.el;
		if (el.type === "radio") {
			return (el.name + "_" + el.value) === key;
		}
		return originalMatcher(element, key);
	};

	/**
	 * @param {Object} data JSON object
	 */
	$.fn.cloneTemplate = function (data) {
		var $wrapper = this.clone()
				.wrapAll("<div class='wrapper'>")
				.closest(".wrapper")
				.render(data);

		return $wrapper.children();
	};

	/**
	 * @param {Array} data List of JSON object
	 */
	$.fn.cloneSelectOptions = function (data) {
		var $element = this;

		$element.find("option").addClass("selectItem");

		$element.render(data, {
			selectItem: {
				value: function (params) {
					return this.value;
				},
				text: function (params) {
					return this.text;
				}
			}
		});

		return this;
	};
})(jQuery);
