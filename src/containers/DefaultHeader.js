import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppSidebarToggler } from '@coreui/react';
import DefaultHeaderDropdown from './DefaultHeaderDropdown'
import { LogoApp } from '../components';
import { revokeToken } from '../store';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  logout = () => {
    revokeToken();
    window.localStorage.removeItem('accessToken');
    window.sessionStorage.removeItem('accessToken');
    this.props.history.replace('/login');
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <LogoApp />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto mr-4" navbar>
          {/* <DefaultHeaderDropdown notif />
          <DefaultHeaderDropdown mssgs /> */}
          <DefaultHeaderDropdown onLogout={this.logout} accnt />
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);
