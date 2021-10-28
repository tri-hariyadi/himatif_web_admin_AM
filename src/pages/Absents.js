import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { FormSearchAbsent, TableAbsent } from '../components';
import { getAllUser, getAllAbsents } from '../store';

const mapStateToProps = state => ({
  getAllUserLoading: state.UserReducer.getAllUserLoading,
  getAllUserData: state.UserReducer.getAllUserData,
  getAllUserError: state.UserReducer.getAllUserError,

  getAllAbsentLoading: state.AbsentReducer.getAllAbsentLoading,
  getAllAbsentData: state.AbsentReducer.getAllAbsentData,
});

const Absents = props => {
  const { getAllUser } = props;
  const onSubmit = (values) => {
    const payload = { ...values }
    if (values.userId) payload.userId = values.userId.value;
    props.getAllAbsents(payload);
  }

  useEffect(() => {
    getAllUser({ role: '1' })
  }, [getAllUser]);

  return (
    <Row className='animated fadeIn'>
      <Col>
        <Card>
          <CardHeader className='d-flex align-items-center'>
            <i className='icon-user-following font-xl'></i>
            <h5
              className='m-0 ml-1'
              style={{ fontFamily: 'FSAlbertBold' }}>
              Data Absensi User
            </h5>
          </CardHeader>
          <CardBody>
            <FormSearchAbsent {...props} onSubmit={onSubmit} />
            <hr className='mb-5' />
            <TableAbsent {...props} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, { getAllUser, getAllAbsents })(Absents);
