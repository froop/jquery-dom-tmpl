/*
 * jquery.clonetemplate.js - jQuery plugin.
 *
 * Depend on Transparency library (https://github.com/leonidas/transparency)
 *
 * Created by froop http://github.com/froop/jquery-clone-template
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery, Transparency, weld */
(function ($) {
	"use strict";

	/**
	 * @param {Object} data JSON object
	 */
	$.fn.cloneTemplate = function (data) {
		var $wrapper = this.clone()
				.wrapAll("<div class='wrapper'>")
				.closest(".wrapper");
		weld($wrapper.get(0), data);
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
