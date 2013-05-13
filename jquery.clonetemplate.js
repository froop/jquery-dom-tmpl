/*
 * jquery.clonetemplate.js - jQuery plugin.
 *
 * Depend on Transparency library (https://github.com/leonidas/transparency)
 *
 * Created by froop http://github.com/froop/jquery-clone-template
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	/**
	 * @param {Object} data JSON object
	 */
	$.fn.cloneTemplate = function (data) {
		var $template = this;
		var $element = $template
				.clone()
				.wrapAll("<div class='dummy'>")
				.closest(".dummy");

		Transparency.render($element.get(0), data);

		return $element.children();
	};
})(jQuery);
