import React, { useRef, useState } from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Tooltip,
  Form
} from 'reactstrap';
import { Button, TextField } from '../../common';
import { validate, PayReimbursementValidationScheme, currencyFormat } from '../../../configs';
import { payReimbursement, updateReimbursement } from '../../../store';

const ModalPayout = ({
  row,
  payReimbursement,
  updateReimbursement
}) => {
  const initialValues = React.useRef({
    CorporateID: 'BCAAPI2016',
    SourceAccountNumber: '0201245680',
    TransactionDate: new Date().toJSON().slice(0, 10),
    CurrencyCode: 'IDR',
    Amount: row.totalPay,
    BeneficiaryAccountNumber: row.userId.accountNumber,
    Remark1: 'Pembayaran Reimbursement Karyawan',
    Remark2: 'Online Transfer via BCA Account'
  });
  const formRef = useRef();
  const [toggle, setToggle] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const onSubmit = async values => {
    setPayLoading(true);
    if (values.Amount.toString().includes('Rp')) values.Amount = values.Amount.toString().replace(/['Rp', '.', \s]/g, '');
    else values.Amount = values.Amount.toString();
    const successPay = await payReimbursement(values);
    if (successPay) {
      let payload = { ...successPay, Status: 'accept', id: row._id }
      let acceptPay = updateStatusReimbursement(payload);
      if (acceptPay) {
        setPayLoading(false);
        swal('Success', 'Pembayaran Reimbursement berhasil', 'success')
          .then((willDelete) => { if (willDelete) setToggle(false) });
      } else acceptPay = updateStatusReimbursement(payload);
    } else {
      setPayLoading(false);
      swal('Gagal', 'Pembayaran Reimbursement Gagal', 'error');
    }
  }

  const updateStatusReimbursement = async payload => {
    const acceptPay = await updateReimbursement(payload);
    return acceptPay;
  }

  return (
    <div>
      <Button
        isSuccess
        type='button'
        id='TooltipPay'
        icon='fa fa-money font-lg'
        style={{ borderRadius: '50%', width: 42, height: 42 }}
        onClick={() => setToggle(v => !v)} />
      <Tooltip placement='left' isOpen={toolTip} target='TooltipPay' toggle={() => setToolTip(v => !v)}>
        Bayar Reimbursement
      </Tooltip>
      <Modal
        isOpen={toggle}
        modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} size='lg'>
        <ModalHeader toggle={() => setToggle(v => !v)} style={{ alignItems: 'center' }} className='d-flex align-items-center'>
          <i className='fa fa-money font-xl mr-2' style={{ marginBottom: 3 }} /> Bayar Reimbursement - {row.userId.username}
        </ModalHeader>
        <ModalBody>
          <Formik
            ref={formRef}
            initialValues={initialValues.current}
            validate={validate(PayReimbursementValidationScheme)}
            onSubmit={onSubmit}
            render={
              (props) => (
                <Row className='login-row-form'>
                  <Col>
                    <Form onSubmit={props.handleSubmit} noValidate name='simpleForm'>
                      <Row>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            type='text'
                            disabled
                            name='CorporateID'
                            id='CorporateID'
                            placeholder='Corporate ID'
                            label='Corporate ID'
                          />
                        </Col>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            type='text'
                            disabled
                            name='SourceAccountNumber'
                            id='SourceAccountNumber'
                            placeholder='Rekening'
                            label='Rekening'
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            type='date'
                            name='TransactionDate'
                            id='TransactionDate'
                            placeholder='Tanggal Pembayaran'
                            label='Tanggal Pembayaran'
                          />
                        </Col>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            type='text'
                            disabled
                            name='CurrencyCode'
                            id='CurrencyCode'
                            placeholder='Mata Uang'
                            label='Mata Uang'
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            type='text'
                            name='Amount'
                            id='Amount'
                            placeholder='Jumlah Yang Dibayarkan'
                            label='Jumlah Yang Dibayarkan'
                            format={currencyFormat}
                            textTransform='none'
                          />
                        </Col>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            disabled
                            type='text'
                            name='BeneficiaryAccountNumber'
                            id='BeneficiaryAccountNumber'
                            placeholder='Rekening Karyawan'
                            label='Rekening Karyawan'
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            type='text'
                            name='Remark1'
                            id='Remark1'
                            placeholder='Catatan 1'
                            label='Catatan 1'
                          />
                        </Col>
                        <Col lg='6'>
                          <TextField
                            {...props}
                            type='text'
                            name='Remark2'
                            id='Remark2'
                            placeholder='Catatan 2'
                            label='Catatan 2'
                          />
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              )
            }
          />
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col className='d-flex flex-row align-items-center justify-content-end'>
              <Button
                isDanger
                hasShadow
                icon='fa fa-times-circle mr-1'
                onClick={() => setToggle(false)}
                style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                Cancel
              </Button>
              <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <Button
                type='button'
                isPrimary
                isLoading={payLoading}
                hasShadow
                className='float-right'
                onClick={() => formRef.current && formRef.current.handleSubmit()}
                style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                <i className='fa fa-send mr-1' /> Payout
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default connect(null, {
  payReimbursement,
  updateReimbursement
})(ModalPayout);
