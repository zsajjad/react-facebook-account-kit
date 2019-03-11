import React from 'react';
import PropTypes from 'prop-types';

function initializeAccountKit(props, callback) {
  ((cb) => {
    const tag = document.createElement('script');
    tag.setAttribute(
      'src',
      `https://sdk.accountkit.com/${props.language}/sdk.js`,
    );
    tag.setAttribute('id', 'account-kit');
    tag.setAttribute('type', 'text/javascript');
    tag.onload = cb;
    document.head.appendChild(tag);
  })(() => {
    window.AccountKit_OnInteractive = function () {
      const {
        appId, csrf, version, debug, display, redirect
      } = props;
      window.AccountKit.init({
        appId,
        state: csrf,
        version,
        debug,
        display,
        redirect,
        fbAppEventsEnabled: false,
      });
      callback();
    };
  });
}

class AccountKit extends React.Component {
  state = {
    initialized: !!window.AccountKit,
  };

  componentDidMount() {
    this.mounted = true;
    if (!this.state.initialized) {
      initializeAccountKit({
        appId: this.props.appId,
        csrf: this.props.csrf,
        version: this.props.version,
        debug: this.props.debug,
        display: this.props.display,
        redirect: this.props.redirect,
        language: this.props.language,
      }, this.onLoad);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onLoad = () => {
    if (this.mounted) {
      this.setState({
        initialized: true,
      });
    }
  };

  signIn = () => {
    if (this.state.disabled) {
      return;
    }
    const {
      loginType,
      onResponse,
      countryCode,
      phoneNumber,
      emailAddress,
    } = this.props;

    const options = {};
    if (countryCode) {
      options.countryCode = countryCode;
    }

    if (loginType === 'PHONE' && phoneNumber) {
      options.phoneNumber = phoneNumber;
    } else if (loginType === 'EMAIL' && emailAddress) {
      options.emailAddress = emailAddress;
    }

    window.AccountKit.login(loginType, options, resp => onResponse(resp));
  }

  render() {
    const disabled = !this.state.initialized || this.props.disabled;
    // @ts-ignore
    return this.props.children({
      onClick: () => {
        this.signIn();
      },
      disabled,
    });
  }
}

AccountKit.propTypes = {
  csrf: PropTypes.string.isRequired,
  appId: PropTypes.string.isRequired,
  version: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  onResponse: PropTypes.func.isRequired,
  loginType: PropTypes.oneOf(['PHONE', 'EMAIL']),
  debug: PropTypes.bool,
  disabled: PropTypes.bool,
  display: PropTypes.oneOf(['popup', 'modal']),
  redirect: PropTypes.string,
  language: PropTypes.string,
  countryCode: PropTypes.string,
  phoneNumber: PropTypes.string,
  emailAddress: PropTypes.string,
};

AccountKit.defaultProps = {
  debug: false,
  disabled: false,
  display: 'popup',
  language: 'en_US',
  loginType: 'PHONE',
};

export default AccountKit;
