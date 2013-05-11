/*
 * jquery.clonetemplate.js - jQuery plugin.
 *
 * Created by froop http://github.com/froop/jquery-clone-template
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	/**
	 * @param {Object} map className: value
	 */
	$.fn.cloneTemplate = function (map) {
		var $template = this;
		var $element = $template.clone();

		$.each(map, function (className) {
			var $field = $element.filter("." + className);
			//TODO
			$field.text(map[className]);
		});

		return $element;
	};
})(jQuery);
