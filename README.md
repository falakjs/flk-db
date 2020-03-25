# IndexedDB db Engine

The db system is built on [LocaleForage API](https://localforage.github.io/localForage). It's a promise based package.

# Installation

`flk install @flk/db`

OR

`npm install @flk/db`

Alias: `db`.

# Table of contents

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
- [Constants](#constants)

# Usage

Once you resolve the db object you can use the methods below.

```javascript
class HomePage {
  /**
   * {@inheritDoc}
   */
  constructor(db) {
    this.db = db;
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

`set(key: String, value: any, expiresAt: Number = IndexedDBEngine.FOREVER): Self`

This method accepts any type of values, the db engine will handle it automatically, so if you want to store object, you don't have to `JSON.stringify` it, the package will take care of it.

The `expiresAt` parameter is used to determine until when the value should be stored in.

> Please note that this method accepts a valid timestamp number, i.e `Date.now()`.

The default value for `expiresAt` is set to **IndexedDBEngine.FOREVER** which mean the value will not be removed from the db until the user clears the browser history.

There are some [useful constants for db expiration time](#constants).

### Examples

```javascript
let db = DI.resolve("db");

db.set("name", "Hasan")
  .then(function(value) {
    // Do other things once the value has been saved.
    console.log(value);
  })
  .catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });

// It can also store objects
let user = {
  name: "Hasan",
  address: "Some street address"
};

db.set("user", user)
  .then(function(value) {
    // This will output the `user` object.
    console.log(value);
  })
  .catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });

// storing arrays is acceptable as well
let users = [
  {
    name: "Hasan",
    address: "Some street address"
  },
  {
    name: "John Doe",
    address: "Another address"
  }
];

db.set("users", users)
  .then(function(value) {
    // This will output the first item in the `users` array.
    console.log(value[0]);
  })
  .catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });

// db for one hour
db.set("accessToken", MyAccessToken, db.FOR_ONE_HOUR)
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {
    // This code runs if there were any errors
    console.log(err);
  });
```

## Get

`get(key: String, defaultValue: any = null): any|null`

Retrieve value from db.

If the key doesn't exist, `defaultValue` will be returned instead.

### Examples

```javascript
let db = DI.resolve("db");

// if the given key exists
let name = db.get("name").then(data => {
  console.log(data); // Hasan
});

// if the given key doesn't exists, return null
let age = db.get("age").then(data => {
  console.log(data); // null
});

// if the given key doesn't exists, return the given default value instead.
let email = db.get("email", "my-email@sitename.com").then(data => {
  console.log(data); // my-email@sitename.com
});
```

## Has

`has(key: String): Boolean`

Determine if the given key exists in db.

### Examples

```javascript
let db = DI.resolve("db");

let ifKeyExists = await db.has("name");

if (ifKeyExists) {
  // do something
}
```

## Remove

`remove(key: String): void`

Remove the given key if exists in db storage.

### Examples

```javascript
let db = DI.resolve("db");

db.remove("name").then(() => {
  console.log("Removed");
});
```

## Clear

`clear(): void`

Clear all db values.

### Examples

```javascript
let db = DI.resolve("db");

db.clear().then(() => {
  console.log("Cleared");
});
```

# Constants

| constant           | Description                                                |
| ------------------ | ---------------------------------------------------------- |
| `IndexedDBEngine.FOR_ONE_HOUR`  | db the value for one hour.                                 |
| `IndexedDBEngine.FOR_TWO_HOURS` | db the value for two hours.                                |
| `IndexedDBEngine.FOR_ONE_DAY`   | db the value for one day.                                  |
| `IndexedDBEngine.FOR_ONE_WEEK`  | db the value for one week.                                 |
| `IndexedDBEngine.FOR_ONE_MONTH` | db the value for one month.                                |
| `IndexedDBEngine.FOR_ONE_YEAR`  | db the value for one year.                                 |
| `IndexedDBEngine.FOREVER`       | db the value until the visitor clears the browser history. |
