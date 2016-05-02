# NPM Script flags

This is a library that allows you to use flags in `npm run` command.

## Install

`$ npm install npm-script-flags`

## Why do we need extra library?

In regards to documentation for use flags we need use `double dash` option:

`npm run gulp build -- --production`

Thanks to this library you can write just:

`npm run gulp build --production`

or even simpler:

`npm run gulp build -p`

## Usage

```javascript
var Flags = require('npm-script-flags');

Flags.define('production-flag', {
    longhand: 'production', // for `--production` handle
    shorthand: 'p' // for `-p` handle
});

if (Flags.isFlag('production-flag')) {
    // Flag is enabled so do something...
}
```

## License

MIT (http://www.opensource.org/licenses/mit-license.php)
