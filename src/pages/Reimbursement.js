import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { FormSearch, TableReimbursement } from '../components';
import { getAllReimbursement, reimbursementResetAllReducer, getAllUser } from '../store';

const mapStateToProps = state => ({
  getAllReimbursementLoading: state.ReimbursementReducer.getAllReimbursementLoading,
  getAllReimbursementData: state.ReimbursementReducer.getAllReimbursementData,

  getAllUserLoading: state.UserReducer.getAllUserLoading,
  getAllUserData: state.UserReducer.getAllUserData,
  getAllUserError: state.UserReducer.getAllUserError,
})

const Reimbursement = (props) => {
  const { getAllReimbursement, reimbursementResetAllReducer, getAllUser } = props;
  const searchReimbursement = values => {
    const payload = { ...values, role: '1' }
    if (values.userId) payload.userId = values.userId.value;
    getAllReimbursement(payload);
  }
  useEffect(() => {
    const current = new Date();
    getAllReimbursement({
      role: '1',
      startDate: new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())),
      endDate: new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()))
    });
    getAllUser({ role: '1' });
    return () => {
      reimbursementResetAllReducer();
    }
  }, [getAllReimbursement, reimbursementResetAllReducer, getAllUser]);

  return (
    <Row className='animated fadeIn'>
      <Col>
        <Card>
          <CardHeader className='d-flex align-items-center'>
            <i className='fa fa-credit-card font-xl'></i>
            <h5
              className='m-0 ml-1'
              style={{ fontFamily: 'FSAlbertBold' }}>
              Reimbursement
            </h5>
          </CardHeader>
          <CardBody>
            <FormSearch {...props} onSubmit={searchReimbursement} />
            <hr className='mb-5' />
            <TableReimbursement {...props} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, {
  getAllReimbursement,
  reimbursementResetAllReducer,
  getAllUser
})(Reimbursement);
