import React, { useRef } from 'react';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, ButtonGroup } from 'reactstrap';
import { AttendanceTag } from '../components';
import { revokeToken } from '../store';

const Setting = () => {
  const history = useHistory();
  const showAttTag = useRef();
  const logout = () => {
    swal({
      title: 'Logout',
      text: 'Yakin mau logout.?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        revokeToken();
        window.localStorage.removeItem('accessToken');
        window.sessionStorage.removeItem('accessToken');
        history.replace('/login');
      }
    });
  }

  const inDevelop = () => {
    swal('Warning', 'Mohon maaf fitur ini sedang dalam tahap pengembangan', 'warning');
  }

  return (
    <Row className='animated fadeIn'>
      <Col>
        <Card>
          <CardHeader className='d-flex align-items-center'>
            <i className='fa fa-cogs font-xl'></i>
            <h5
              className='m-0 ml-1'
              style={{ fontFamily: 'FSAlbertBold' }}>
              Settings
            </h5>
          </CardHeader>
          <CardBody>
            <Row>
              <AttendanceTag ref={showAttTag} />
              <Col xs='12' sm='6' lg='4'>
                <Card
                  className='text-white bg-primary m-2 mb-4 menu-settings'
                  style={{ height: 200 }}
                  onClick={() => showAttTag && showAttTag.current && showAttTag.current.setToggle(true)}>
                  <CardBody className='d-flex flex-column align-items-center justify-content-between'>
                    <ButtonGroup className='float-right'>
                      <i className='fa fa-tags' style={{ fontSize: 80 }}></i>
                    </ButtonGroup>
                    <h5>Attendance Tag</h5>
                  </CardBody>
                </Card>
              </Col>
              <Col xs='12' sm='6' lg='4'>
                <Card className='text-white bg-success m-2 mb-4 menu-settings' onClick={inDevelop} style={{ height: 200 }}>
                  <CardBody className='d-flex flex-column align-items-center justify-content-between'>
                    <ButtonGroup className='float-right'>
                      <i className='fa fa-envelope' style={{ fontSize: 80 }}></i>
                    </ButtonGroup>
                    <h5>Pesan</h5>
                  </CardBody>
                </Card>
              </Col>
              <Col xs='12' sm='6' lg='4'>
                <Card className='text-white bg-info m-2 mb-4 menu-settings' onClick={inDevelop} style={{ height: 200 }}>
                  <CardBody className='d-flex flex-column align-items-center justify-content-between'>
                    <ButtonGroup className='float-right'>
                      <i className='fa fa-credit-card' style={{ fontSize: 80 }}></i>
                    </ButtonGroup>
                    <h5>Akun Rekening</h5>
                  </CardBody>
                </Card>
              </Col>
              <Col xs='12' sm='6' lg='4'>
                <Card
                  onClick={() => logout()}
                  className='text-white bg-danger m-2 mb-4 menu-settings'
                  style={{ height: 200, marginTop: '1.2rem !important' }}>
                  <CardBody className='d-flex flex-column align-items-center justify-content-between'>
                    <ButtonGroup className='float-right'>
                      <i className='fa fa-sign-out' style={{ fontSize: 80 }}></i>
                    </ButtonGroup>
                    <h5>Log Out</h5>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Setting
