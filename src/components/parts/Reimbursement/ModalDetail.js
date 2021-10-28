import React, { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Tooltip, Row, Col, Badge, ModalFooter } from 'reactstrap';
import { Button } from '../../common'
import { currencyFormat, formatDate } from '../../../configs';

const ModalDetail = ({ row }) => {
  const [toggle, setToggle] = useState(false);
  const [toolTip, setToolTip] = useState(false);
  return (
    <div>
      <Button
        isSuccess
        type='button'
        id='TooltipPay'
        icon='fa fa-check font-lg'
        style={{ borderRadius: '50%', width: 42, height: 42 }}
        onClick={() => setToggle(v => !v)} />
      <Tooltip placement='left' isOpen={toolTip} target='TooltipPay' toggle={() => setToolTip(v => !v)}>
        Detail Pembayaran Reimbursement
      </Tooltip>
      <Modal
        isOpen={toggle}
        modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} size='lg'>
        <ModalHeader toggle={() => setToggle(v => !v)} style={{ alignItems: 'center' }} className='d-flex align-items-center'>
          <i className='fa fa-money font-xl mr-2' style={{ marginBottom: 3 }} /> Detail Pembayaran Reimbursement - {row.userId.username}
        </ModalHeader>
        <ModalBody>
          <Row className='mb-3'>
            <Col md='6'>
              <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
                <h5 className='mb-0'>ID Pembayaran</h5>
                <h5 className='mb-0'>:</h5>
              </div>
            </Col>
            <Col md='6' className='d-flex flex-row align-items-center'>
              <h5 className='mb-0'>{row.TransactionID}</h5>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md='6'>
              <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
                <h5 className='mb-0'>Tanggal Pembayaran</h5>
                <h5 className='mb-0'>:</h5>
              </div>
            </Col>
            <Col md='6' className='d-flex flex-row align-items-center'>
              <h5 className='mb-0'>{formatDate(new Date(row.TransactionDate))}</h5>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md='6'>
              <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
                <h5 className='mb-0'>Referance ID</h5>
                <h5 className='mb-0'>:</h5>
              </div>
            </Col>
            <Col md='6' className='d-flex flex-row align-items-center'>
              <h5 className='mb-0 text-uppercase'>{row.ReferenceID}</h5>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md='6'>
              <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
                <h5 className='mb-0'>Total Yang Dibayarkan</h5>
                <h5 className='mb-0'>:</h5>
              </div>
            </Col>
            <Col md='6' className='d-flex flex-row align-items-center'>
              <h5 className='mb-0'>{currencyFormat(row.totalPay)}</h5>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col md='6'>
              <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
                <h5 className='mb-0'>Status Pembayaran</h5>
                <h5 className='mb-0'>:</h5>
              </div>
            </Col>
            <Col md='6' className='d-flex flex-row align-items-center'>
              <Badge
                pill
                className='status-attendance'
                color={row.status === 'accept' ? 'success' : row.status === 'processing' ? 'warning' : 'danger'}>
                {row.status === 'accept' ? 'Diterima' : row.status === 'processing' ? 'Untuk Diproses' : 'Ditolak'}
              </Badge>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col className='d-flex flex-row align-items-center justify-content-end'>
              <Button
                isSuccess
                hasShadow
                icon='fa fa-check-circle mr-2'
                onClick={() => setToggle(false)}
                style={{ paddingRight: '20px', paddingLeft: '20px' }}>
                OK
              </Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default ModalDetail
