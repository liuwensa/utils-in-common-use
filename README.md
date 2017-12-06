# utils-in-common-use

> javascript/node.js utility functions, contain some frequently-used tools like loadsh uuid validator md5 and so on.

Install with [npm](https://www.npmjs.com/)

```sh
$ npm i utils-in-common-use --save
```

## Usage

```js
var utilsInCommonUse = require('utils-in-common-use');
```

It's get all utils on one object, loadsh uuid validator md5 and other functions.

If you just want the one if the utils:

```js
var {string, object, loadsh, uuid} = require('utils-in-common-use');
```

## API

### loadsh

`utilsInCommonUse.loadsh` or `utilsInCommonUse._`

### uuid

### validator
extend functions:
- isUserName
- isGBKName
- isPsd 
- isQQ 
- isEn 
- isIdCard 
- isPhoneNum
- isUrl

### md5

### date
- format
- getStartTime
- getEndTime

### object

### string
- digitUppercase
- getRandomCode,
- htmlToText

### others
- myuuid
- getIpv4
- getReqIP
- randomArray
- uniqPush
- transData
- getRandomMoney
- checkVersion
- bitCount
- dealKeyWord