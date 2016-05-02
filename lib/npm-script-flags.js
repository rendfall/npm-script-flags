'use strict';

var REGEXP_SHORTHAND = /^-\w$/i;
var REGEXP_LONGHAND = /^--\w+$/i;

function NPMScriptFlags() {
    this.argv = process.argv;
    this.passedArgs = this.collectArgs();
    this.definedArgs = {};
};

/**
 * Extract arguments from global `process` variable.
 * 
 * @return {Object}
 */
NPMScriptFlags.prototype.collectArgs = function collectArgs() {
    var argv = this.argv;
    var results = {
        short: [],
        long: []
    };

    for (var i = 0; i < argv.length; i += 1) {
        var short = REGEXP_SHORTHAND.exec(argv[i]);
        var long = REGEXP_LONGHAND.exec(argv[i]);

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
};

/**
 * Define custom flag.
 * 
 * @param {string} name Flag name
 * @param {Object} opts Options
 * @param {string} opts.longhand Longhand name for flag
 * @param {string} opts.shorthand Shorthand name for flag
 * @return {Object} 
 */
NPMScriptFlags.prototype.define = function define(name, opts) {
    this.definedArgs[name] = opts;

    return this;
};

/**
 * Check if flag is passed (enabled).
 * 
 * @param  {string} name Flag name
 * @return {Boolean}
 */
NPMScriptFlags.prototype.isFlag = function isFlag(name) {
    var opts = this.definedArgs[name];

    if (!opts) {
        return false;
    }

    var isShort = new RegExp('-' + opts.shorthand).test(this.passedArgs.short);
    var isLong = new RegExp('-' + opts.longhand).test(this.passedArgs.long);

    return (isShort || isLong);
};

/**
 * Check if flag is exists and return it's name.
 * WARNING: Only for longhand flags.
 */
NPMScriptFlags.prototype.getFlagByIndex = function getFlagByIndex(idx) {
        var flag = this.passedArgs['long'][idx];

        // Remove doubled dashes - we want only name.
        if (flag) {
            flag = flag.replace('--', '');
        };

    return flag;
};

/**
 * Warning: DEPRECTED!
 */
NPMScriptFlags.prototype.setup = function setup(env) {};

/**
 * Build API by specified methods.
 * 
 * @return {Object}
 */
NPMScriptFlags.prototype.getAPI = function getAPI() {
    var methods = ['define', 'isFlag', 'getFlagByIndex'];
    var API = {};

    for (var i = 0; i < methods.length; i += 1) {
        var fn = methods[i];

        API[fn] = this[fn].bind(this);
    }
        
    return API;
};

// Create instance of library.
var Flags = new NPMScriptFlags();

// Export API.
module.exports = Flags.getAPI();
