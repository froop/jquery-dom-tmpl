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
	 * @param {Object} map className / input[name]: value
	 */
	$.fn.cloneTemplate = function (map) {
		var $template = this;
		var $element = $template.clone();

		function setValue($fields, value) {
			$fields.filter("input").val(value); //TODO checkbox, radio, select
			$fields.not("input").text(value);
		}

		$.each(map, function (name) {
			//TODO refactoring
			setValue($element.filter("." + name), map[name]);
			setValue($element.find("." + name), map[name]);
			setValue($element.filter("input[name=" + name + "]"), map[name]);
			setValue($element.find("input[name=" + name + "]"), map[name]);
		});

		return $element;
	};
})(jQuery);
