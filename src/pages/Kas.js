import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { FormSearchKas, TableKas, Button } from '../components';
import {
  getAllUser,
  getKasTransaction,
  kasResetAllReducer,
  verifyKasTransaction,
  deleteKasTransaction
} from '../store';

const mapStateToProps = state => ({
  getKasLoading: state.KasReducer.getKasLoading,
  getKasData: state.KasReducer.getKasData,

  getAllUserLoading: state.UserReducer.getAllUserLoading,
  getAllUserData: state.UserReducer.getAllUserData,
  getAllUserError: state.UserReducer.getAllUserError,
})

const Kas = (props) => {
  const {
    getAllUser,
    getKasTransaction,
    kasResetAllReducer,
  } = props;

  useEffect(() => {
    return () => {
      localStorage.removeItem('paramGetKasTrans');
    }
  }, []);

  useEffect(() => {
    const current = new Date();
    const payload = {
      startDate: new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate())),
      endDate: new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate()))
    }
    getKasTransaction(payload);
    localStorage.setItem('paramGetKasTrans', JSON.stringify(payload));
    getAllUser({ role: '1' });
    return () => {
      kasResetAllReducer();
    }
  }, [getAllUser, kasResetAllReducer, getKasTransaction]);

  const searchKasTransaction = values => {
    const payload = { ...values }
    if (values.userId) payload.userId = values.userId.value;
    getKasTransaction(payload);
    localStorage.setItem('paramGetKasTrans', JSON.stringify(payload));
  }

  return (
    <Row className='animated fadeIn'>
      <Col>
        <Card>
          <CardHeader className='d-flex align-items-center justify-content-between'>
            <div className='d-flex flex-row align-items-center'>
              <i className='fa fa-exchange font-xl'></i>
              <h5
                className='m-0 ml-2'
                style={{ fontFamily: 'FSAlbertBold' }}>
                Kas Transaction
              </h5>
            </div>
            <Button
              type='link'
              href='/kastransaction/addkastransaction'
              isSuccess
              icon='fa fa-plus mr-2'>
              Tambah Data Transaksi Kas
            </Button>
          </CardHeader>
          <CardBody>
            <FormSearchKas {...props} onSubmit={searchKasTransaction} />
            <hr className='mb-5' />
            <TableKas {...props} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, {
  getAllUser,
  getKasTransaction,
  kasResetAllReducer,
  verifyKasTransaction,
  deleteKasTransaction
})(Kas);
