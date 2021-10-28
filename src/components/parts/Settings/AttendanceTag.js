import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { Modal, ModalBody, ModalHeader, Tooltip, Row, Col, Form } from 'reactstrap';
import { Formik } from 'formik';
import { Button, TextField, LoadingFilter } from '../../common';
import { getAllAttendanceTag, addAttendanceTag, deleteAttendanceTag } from '../../../store';

const mapStateToProps = state => ({
  getAllAttendanceTagLoading: state.AttendanceTagReducer.getAllAttendanceTagLoading,
  getAllAttendanceTagData: state.AttendanceTagReducer.getAllAttendanceTagData,
  getAllAttendanceTagError: state.AttendanceTagReducer.getAllAttendanceTagError,
})

const AttendanceTag = forwardRef(({
  getAllAttendanceTagLoading,
  getAllAttendanceTagData,
  getAllAttendanceTagError,
  getAllAttendanceTag,
  addAttendanceTag,
  deleteAttendanceTag
}, ref) => {
  const [toggle, setToggle] = useState(false);
  const [toolTip, setToolTip] = useState({ idx: 0, show: false });
  const [loadingDelete, setLoadingDelete] = useState({ idx: 0, loading: false });
  const initialValues = useRef({ desc: '' });
  const formRef = useRef();
  if (ref) ref.current = { setToggle };

  useEffect(() => {
    if (!getAllAttendanceTagData && toggle) getAllAttendanceTag()
  }, [getAllAttendanceTag, getAllAttendanceTagData, toggle]);

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    if (!values.desc) {
      setSubmitting(false);
      return setErrors({ desc: 'Tag Harus diisi' });
    }
    const result = await addAttendanceTag(values);
    if (!result) swal('Error', 'Gagal menambahkan tag!', 'error');
    else {
      formRef.current && formRef.current.handleReset();
      getAllAttendanceTag();
    }
    setSubmitting(false);
  }

  const deleteDataAttTag = (id, idx) => {
    swal({
      title: 'Konfirmasi',
      text: 'Apakah anda yakin ingin menghapus Tag ini?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoadingDelete({ idx, loading: true });
        const result = await deleteAttendanceTag({ id });
        if (!result) swal('Error', 'Gagal menambahkan tag!', 'error');
        else getAllAttendanceTag();
        setLoadingDelete({ idx, loading: false });
      }
    });
  }

  return (
    <div>
      <Modal
        isOpen={toggle}
        modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }} size='xl'>
        <ModalHeader toggle={() => setToggle(v => !v)} style={{ alignItems: 'center' }} className='d-flex align-items-center'>
          <i className='fa fa-tags font-xl mr-2' style={{ marginBottom: 3 }} /> Attendance Tags
        </ModalHeader>
        <ModalBody className='mb-4'>
          <Row>
            <Col lg='6'>
              <Row className='mb-3'>
                <Col>
                  <h5>List Attendance Tag</h5>
                </Col>
              </Row>
              <Row style={{ maxHeight: '70vh', overflowX: 'scroll' }}>
                <Col>
                  {getAllAttendanceTagLoading ?
                    <LoadingFilter />
                    :
                    getAllAttendanceTagData ?
                      getAllAttendanceTagData.map((item, idx) => (
                        <div
                          key={`tag-${idx}`}
                          className={['d-flex flex-row align-items-center justify-content-between',
                            getAllAttendanceTagData.length > 1 && idx === getAllAttendanceTagData.length - 1 ? '' : 'box-attendance-tag mb-10'
                          ].join(' ')}>
                          <div className='d-flex flex-row align-items-center justify-content-start'>
                            <i className='fa fa-tag mr-2 font-lg' style={{ color: '#13C2C2' }} />
                            <h6 className='mb-0' style={{ fontFamily: 'FSAlbertBold', fontSize: '0.97rem' }}>{item.desc}</h6>
                          </div>
                          <Button
                            isDanger
                            id={`DeleteTag${idx}`}
                            icon={loadingDelete.idx && loadingDelete.idx === idx && loadingDelete.loading ?
                              'fa fa-spinner fa-spin font-lg' : 'fa fa-trash'}
                            textLoading={null}
                            onClick={() => deleteDataAttTag(item._id, idx)}
                          />
                          <Tooltip
                            placement='left'
                            isOpen={toolTip.idx === idx && toolTip.show}
                            target={`DeleteTag${idx}`}
                            toggle={() => setToolTip(v => ({ ...v, idx, show: !v.show }))}>
                            Hapus Tag
                          </Tooltip>
                        </div>
                      ))
                      :
                      <div>
                        <h5>{getAllAttendanceTagError || 'Tidak Data Untuk Ditampilkan'}</h5>
                      </div>
                  }
                </Col>
              </Row>
            </Col>
            <Col lg='6'>
              <Row className='mb-3'>
                <Col>
                  <h5>Add Attendance Tag</h5>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Formik
                    ref={formRef}
                    initialValues={initialValues.current}
                    onSubmit={onSubmit}
                    render={
                      (props) => (
                        <Row>
                          <Col>
                            <Form onSubmit={props.handleSubmit} noValidate name='simpleForm'>
                              <Row>
                                <Col>
                                  <TextField
                                    {...props}
                                    type='textarea'
                                    name='desc'
                                    id='desc'
                                    placeholder='Add Attendance Tag'
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col className='d-flex flex-row align-items-center justify-content-end'>
                                  <Button
                                    isPrimary
                                    type='submit'
                                    isLoading={props.isSubmitting}
                                    icon='fa fa-plus mr-2'>
                                    Add
                                  </Button>
                                  <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                  <Button
                                    isSecondary
                                    icon='fa fa-times-circle mr-2'
                                    onClick={() => setToggle(false)}>
                                    Cancel
                                  </Button>
                                </Col>
                              </Row>
                            </Form>
                          </Col>
                        </Row>
                      )
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
})

export default connect(mapStateToProps, {
  getAllAttendanceTag,
  addAttendanceTag,
  deleteAttendanceTag
}, null, { forwardRef: true })(AttendanceTag);
