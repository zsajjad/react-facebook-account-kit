# React Account Kit

> An [Account Kit](https://developers.facebook.com/docs/accountkit) Component for React

## Install
```
npm install react-facebook-account-kit

```

## How to use
```js
import React from 'react';
import ReactDOM from 'react-dom';
import AccountKit from 'react-facebook-account-kit';

ReactDOM.render(
    <AccountKit
      appId="your-facebook-appId" // Update this!
      version="v1.0" // Version must be in form v{major}.{minor}
      onResponse={(resp) => console.log(resp)}
      csrf={'csrf token here!'} // Required for security
      countryCode={'default country code'} // eg. +60
      phoneNumber={'default phone number'} // eg. 12345678
      emailAddress={'default email address'} // eg. me@site.com
    >
      {p => <button {...p}>Initialize Account Kit</button>}
    </AccountKit>,
  document.getElementById('app')
);
```

## Required Props
- ```csrf``` CSRF token as a string (Required by account kit sdk)
- ```appId``` Facebook's app id (string)
- ```version``` Account kit SDK version (string),
- ```children``` Function that will return a valid react component or null,
- ```onResponse``` Function that will handle the response for possible responses check [Account Kit Documentation](https://developers.facebook.com/docs/accountkit/webjs)

## Optional Props
- ```loginType``` default is ```PHONE```
- ```debug``` default is ```false```
- ```disabled``` default is ```false```
- ```display``` default is ```popup```
- ```language``` default is ```en_US```
- ```countryCode``` default country code. default value is ```undefined```
- ```phoneNumber``` default phone number. default value is ```undefined```
- ```emailAddress``` default email address. default value is ```undefined```.
*`loginType`* must be set to ```"EMAIL"``` for this to work.
- ```redirect``` redirect URL after email confirmation. default value is ```undefined```.
*`loginType`* must be set to ```"EMAIL"``` for this to work.


## Dev Server
```
npm run start

```
Default dev server runs at localost:8080 in browser.
You can set IP and PORT in webpack.config.dev.js

## Production Bundle
```
npm run bundle
```

### Follow me on Twitter: [@zsajjad93](https://twitter.com/zsajjad93)
