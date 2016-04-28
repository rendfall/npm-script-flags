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
    },
    
    // Warning: Only for longhand flags
    getFlagByIndex: function (idx) {
            var flag = this.passedArgs['long'][idx];

            // Remove dashes - we want only name.
            if (flag) {
                flag = flag.replace('--', '');
            };

        return flag;
    }
};

module.exports = NPMScriptFlags;
