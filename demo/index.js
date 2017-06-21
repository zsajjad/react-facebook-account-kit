import React from 'react';
import ReactDOM from 'react-dom';
import AccountKit from '../src/index';

ReactDOM.render(
  <AccountKit
    appId="your-facebook-appId"
    version="v1.0"
    onResponse={resp => console.log(resp)}
    csrf={'csrf token here!'}
  >
    {p => <button {...p}>Initialize Account Kit</button>}
  </AccountKit>,
  document.getElementById('app')
);
