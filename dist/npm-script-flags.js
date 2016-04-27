(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["npm-script-flags"] = factory();
	else
		root["npm-script-flags"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var REGEXP_SHORTHAND = /^-\w$/i;
	var REGEXP_LONGHAND = /^--\w+$/i;

	function collectArgs(args) {
	    var results = {
	        short: [],
	        long: []
	    };

	    for (var i = 0; i < args.length; i+=1) {
	        var short = REGEXP_SHORTHAND.exec(args[i]);
	        var long = REGEXP_LONGHAND.exec(args[i]);

	        // example: -p
	        if (short) {
	            results.short.push(short[0]);
	        }

	        // example: --production
	        if (long) {
	            results.long.push(long[0]);
	        }
	    }

	    return results;
	}

	var NPMScriptFlags = {
	    argv: {},
	    passedArgs: {},
	    definedArgs: {},
	    
	    setup: function (env) {
	        var obj = JSON.parse(env.npm_config_argv);
	        this.argv = obj.original.splice(2);
	        this.passedArgs = collectArgs(this.argv);
	    },

	    define: function (name, opts) {
	        this.definedArgs[name] = opts;

	        return this;
	    },

	    isFlag: function (name) {
	        var opts = this.definedArgs[name];

	        if (!opts) {
	            return false;
	        }

	        var isShort = new RegExp('-' + opts.shorthand).test(this.passedArgs.short);
	        var isLong = new RegExp('-' + opts.longhand).test(this.passedArgs.long);

	        return (isShort || isLong);
	    }
	};

	module.exports = NPMScriptFlags;


/***/ }
/******/ ])
});
;