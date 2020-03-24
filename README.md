# IndexedDB Cache Engine
The cache system is built on [LocaleStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage).

# Installation
`flk install flk-cache`

OR 

`npm install flk-cache`

Alias: `cache`.

# Table of contents
- [Cache](#cache)
- [Installation](#installation)
- [Table of contents](#table-of-contents)
- [Usage](#usage)
- [Available methods](#available-methods)
  - [Set](#set)
    - [Examples](#examples)
  - [Get](#get)
    - [Examples](#examples-1)
  - [Has](#has)
    - [Examples](#examples-2)
  - [Remove](#remove)
    - [Examples](#examples-3)
  - [Clear](#clear)
    - [Examples](#examples-4)
- [Configurations](#configurations)
- [Constants](#constants)


# Usage

Once you resolve the cache object you can use the methods below.

```javascript

class HomePage {
    /**
     * {@inheritDoc}
     */
    constructor(cache) {
        this.cache = cache;
    } 
}
```

# Available methods
- [set](#set)
- [get](#get)
- [has](#has)
- [remove](#remove)
- [clear](#clear)

## Set

`set(key: String, value: any, expiresAt: Number = Cache.FOREVER): Self`

This method accepts any type of values, the cache engine will handle it automatically, so if you want to store object, you don't have to `JSON.stringify` it, the package will take care of it.

The `expiresAt` parameter is used to determine until when the value should be stored in.

> Please note that this method accepts a valid timestamp number, i.e `Date.now()`.

The default value for `expiresAt` is set to **Cache.FOREVER** which mean the value will not be removed from the cache until the user clears the browser history.

There are some [useful constants for cache expiration time](#constants).

### Examples

```javascript
let cache = DI.resolve('cache');

cache.set('name', 'Hasan');

// It can also store objects
let user = {
    name: 'Hasan',
    address: 'Some street address',
};

cache.set('user', user);

// storing arrays is acceptable as well
let users = [{
    name: 'Hasan',
    address: 'Some street address',
}, {
    name: 'John Doe',
    address: 'Another address',
}];

cache.set('users', users);

// cache for one hour
cache.set('accessToken', MyAccessToken, Cache.FOR_ONE_HOUR);11
```

## Get

`get(key: String, defaultValue: any = null): any|null`

Retrieve value from cache.

If the key doesn't exist, `defaultValue` will be returned instead.

### Examples

```javascript
let cache = DI.resolve('cache');

// if the given key exists
let name = cache.get('name'); // Hasan

// if the given key doesn't exists, return null
let age = cache.get('age'); // null

// if the given key doesn't exists, return the given default value instead.
let email = cache.get('email', 'my-email@sitename.com'); // my-email@sitename.com
```

## Has

`has(key: String): Boolean`

Determine if the given key exists in cache.

### Examples

```javascript
let cache = DI.resolve('cache');

if (cache.has('name')) {
    // do something
}
```

## Remove

`remove(key: String): void`

Remove the given key if exists in cache storage.

### Examples

```javascript
let cache = DI.resolve('cache');

cache.remove('name');

```

## Clear

`clear(): void`

Clear all cache values.

### Examples

```javascript
let cache = DI.resolve('cache');

cache.clear();
```

# Configurations
Available configurations for `cache` in [Application configurations](https://github.com/falakjs/flk-config).

**Main Configuration key**: `cache`

| key           | Type      | Default value | Description                                                                            |
| ------------- | --------- | ------------- | -------------------------------------------------------------------------------------- |
| encryptValues | `Boolean` | **true**      | If set to `true`, any value will be encrypted using the [Crypto](https://github.com/falakjs/flk-crypto) package. |

> It's recommended to set the type of the **encryptionValue** in your `config.js` in the beginning of your application development as it works on all the cached values.

# Constants

| constant              | Description                                                   |
| --------------------- | ------------------------------------------------------------- |
| `Cache.FOR_ONE_HOUR`  | Cache the value for one hour.                                 |
| `Cache.FOR_TWO_HOURS` | Cache the value for two hours.                                |
| `Cache.FOR_ONE_DAY`   | Cache the value for one day.                                  |
| `Cache.FOR_ONE_WEEK`  | Cache the value for one week.                                 |
| `Cache.FOR_ONE_MONTH` | Cache the value for one month.                                |
| `Cache.FOR_ONE_YEAR`  | Cache the value for one year.                                 |
| `Cache.FOREVER`       | Cache the value until the visitor clears the browser history. |