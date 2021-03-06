/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window, CSSLint, Mustache */

define(function (require, exports, module) {
	'use strict';

	var AppInit                 = brackets.getModule("utils/AppInit"),
		CodeInspection			= brackets.getModule("language/CodeInspection");

	require("htmlhint/htmlhint");

	function htmlHinter(text, fullPath) {
		var results;
		results = HTMLHint.verify(text);

		if (results.length) {

			var result = { errors: [] };

			for(var i=0, len=results.length; i<len; i++) {

				var messageOb = results[i];

				if(!messageOb.line) continue;
				//default
				var type = CodeInspection.Type.WARNING;

				if(messageOb.type === "error") {
					type = CodeInspection.Type.ERROR;
				} else if(messageOb.type === "warning") {
					type = CodeInspection.Type.WARNING;
				}

				result.errors.push({
					pos: {line:messageOb.line-1, ch:messageOb.col},
					message:messageOb.message,
					
					type:type
				});
				
			}
			
			return result;
		} else {
			//no errors
			return null;
		}

	}

	CodeInspection.register("html", {
		name: "HTMLHint",
		scanFile: htmlHinter
	});
	CodeInspection.register("htm", {
		name: "HTMLHint",
		scanFile: htmlHinter
	});


});
