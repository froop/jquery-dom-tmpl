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

	/**
	 * @param {Object} data JSON object
	 */
	$.fn.cloneTemplate = function (data) {
		var $wrapper = this.clone()
				.wrapAll("<div class='wrapper'>")
				.closest(".wrapper");

		Transparency.render($wrapper.get(0), data);

		return $wrapper.children();
	};
})(jQuery);
