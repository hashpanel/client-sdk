# hashware-backbone-client

Backbone client library for the hashware API

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]

## Usage

```js
var HashwareClient = require('hashware-backbone-client');
HashwareClient.load()
  .then(function (api) {
    api.User.fetch({ name: 'tjwebb' });
  });

```

[sails-logo]: http://cdn.tjw.io/images/sails-logo.png
[sails-url]: https://sailsjs.org
[npm-image]: https://img.shields.io/npm/v/backbone-client.svg?style=flat-square
[npm-url]: https://npmjs.org/package/backbone-client
[travis-image]: https://img.shields.io/travis/hashware/backbone-client.svg?style=flat-square
[travis-url]: https://travis-ci.org/hashware/backbone-client
[daviddm-image]: http://img.shields.io/david/hashware/backbone-client.svg?style=flat-square
[daviddm-url]: https://david-dm.org/hashware/backbone-client
