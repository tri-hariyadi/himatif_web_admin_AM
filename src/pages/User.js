import React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { TableUser, Button } from '../components';
import { getAllUser, deleteUser, resetAllUserReducer } from '../store';

const mapStateToProps = state => ({
  getAllUserLoading: state.UserReducer.getAllUserLoading,
  getAllUserData: state.UserReducer.getAllUserData,

  deleteUserLoading: state.UserReducer.deleteUserLoading,
  deleteUserData: state.UserReducer.deleteUserData,
  deleteUserError: state.UserReducer.deleteUserError,
})

const User = props => {
  const { getAllUser, resetAllUserReducer } = props;
  React.useEffect(() => {
    return () => {
      resetAllUserReducer();
    }
  }, [resetAllUserReducer]);

  React.useEffect(() => {
    getAllUser({ role: '1' }, true);
  }, [getAllUser]);

  return (
    <Row className='animated fadeIn'>
      <Col>
        <Card>
          <CardHeader className='d-flex align-items-center justify-content-between'>
            <div className='d-flex flex-row align-items-center'>
              <i className='fa fa-users font-xl'></i>
              <h5
                className='m-0 ml-2'
                style={{ fontFamily: 'FSAlbertBold' }}>
                Data User
              </h5>
            </div>
            <Button
              type='link'
              href='/user/addnewuser'
              isSuccess
              icon='fa fa-user-plus mr-2'>
              Tambah User Baru
            </Button>
          </CardHeader>
          <CardBody>
            <TableUser {...props} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, { getAllUser, deleteUser, resetAllUserReducer })(User)
