import React, { useRef, useState } from 'react';
import jwt from 'jsonwebtoken';
import { Formik } from 'formik';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { Col, FormFeedback, Row } from 'reactstrap';
import { TextField } from '../../common';
import { AddKasTransValidationScheme, currencyFormat, getUserPayload, validate } from '../../../configs';

const AddDataKasTransaction = React.forwardRef((props, ref) => {
  const [typeTransaction, setTypeTransaction] = useState('');
  const [imageState, setImageState] = useState('');
  const currentDate = new Date();
  const formRef = useRef();
  const initialValues = useRef({
    userId: jwt.decode(getUserPayload()).idUser,
    userName: jwt.decode(getUserPayload()).username,
    totalPay: '',
    desc: '',
    dateTransaction: new Date(Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())),
    status: 'accept',
    fileProofPayment: '',
    fileType: ''
  });
  if (ref && formRef.current) ref.current = Object.assign({}, formRef, { typeTransaction });

  const handleChange = async (e, props) => {
    let files = e.target.files;
    let allFiles = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = async () => {
        let fileInfo = {
          name: file.name,
          type: file.type,
          size: Math.round(file.size / 1000) + ' kB',
          base64: reader.result,
          file: file,
        };
        allFiles.push(fileInfo);
        if (allFiles.length === files.length) {
          setImageState(allFiles[0].base64);
          props.setFieldTouched('fileType', true);
          props.setFieldValue('fileType', allFiles[0].type, true);
          props.setFieldValue('fileProofPayment', allFiles[0].file);
        }
      }
    }
  }

  return (
    <Formik
      ref={formRef}
      initialValues={initialValues.current}
      validate={validate(AddKasTransValidationScheme)}
      onSubmit={props.onSubmit}
      render={
        (props) => (
          <Row>
            <Col>
              <Row>
                <Col md='6'>
                  <div className='w-100 mb-4 d-flex flex-column align-items-start justify-content-start'>
                    <div className='d-flex flex-column'>
                      <label className='float-left ml-1'>Pilih Jenis Transaksi</label>
                      <div className='d-flex flex-row align-items-center justify-content-center options-group-wrapper'>
                        <button
                          type='button'
                          onClick={() => {
                            document.querySelector('.type-2').classList.remove('options-selected');
                            document.querySelector('.type-1').classList.add('options-selected');
                            setTypeTransaction('income');
                          }}
                          className='options-group type-1'>
                          <p className='m-0'>Pemasukan</p>
                        </button>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <button
                          type='button'
                          onClick={() => {
                            document.querySelector('.type-1').classList.remove('options-selected');
                            document.querySelector('.type-2').classList.add('options-selected');
                            setTypeTransaction('spend');
                          }}
                          className='options-group type-2'>
                          <p className="m-0">Pengeluaran</p>
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg='6'>
                  <TextField
                    {...props}
                    type='text'
                    name='userName'
                    id='userName'
                    placeholder='User Name'
                    label='User Name'
                    textTransform='capitalize'
                    disabled
                  />
                </Col>
                <Col lg='6'>
                  <TextField
                    {...props}
                    type='text'
                    name='totalPay'
                    id='totalPay'
                    placeholder='Total Pemasukan/Pengeluaran'
                    label='Total Pemasukan/Pengeluaran'
                    format={currencyFormat}
                    textTransform='none'
                  />
                </Col>
              </Row>
              <Row>
                <Col lg='6'>
                  <TextField
                    {...props}
                    type='textarea'
                    name='desc'
                    id='desc'
                    placeholder='Deskripsi Transaksi'
                    label='Deskripsi Transaksi'
                  />
                </Col>
                <Col lg='6' className='w-100 d-flex flex-column'>
                  {imageState && <label htmlFor='fileProofPayment' className='change-doc'>{'>>'} Change Document</label>}
                  <div className='h-100 d-flex align-items-center justify-content-center'>
                    <input
                      name='fileProofPayment'
                      type='file'
                      id='fileProofPayment'
                      onChange={(e) => {
                        handleChange(e, props);
                        props.handleChange(e)
                      }}
                      className='input-file'
                    />
                    <label
                      htmlFor={!imageState ? 'fileProofPayment' : ''}
                      className={imageState ? 'is-disabled' : ''}
                      style={Object.keys(props.touched).filter(i => i.includes('file')).length > 0 && Object.keys(props.touched).filter(i => i.includes('file')).every(i => props.touched[i] === true) &&
                        Object.keys(props.errors).filter(i => i.includes('file')).length > 0 && Object.keys(props.errors).filter(i => i.includes('file')).every(i => props.errors[i] !== '') ?
                        { borderColor: '#dc3545' } : props.values['fileProofPayment'] ? { borderColor: '#28a745' } : {}}>
                      {imageState ?
                        <div className='p-1'>
                          <Zoom zoomMargin={40}>
                            <img
                              src={imageState}
                              alt='proof-payment'
                              className='img-fluid'
                            />
                          </Zoom>
                        </div>
                        :
                        <div className='d-flex flex-column align-items-center justify-content-center'>
                          <i className='fa fa-picture-o' style={{ fontSize: 50, color: '#ddd' }} />
                          <p className='mb-0 mt-1'>Click to upload proof payment</p>
                        </div>
                      }
                    </label>
                  </div>
                  {!(props.touched['fileProofPayment'] && props.errors['fileProofPayment'])
                    && <TextField {...props} type='hidden' name='fileType' />}
                  <FormFeedback
                    style={props.touched['fileProofPayment'] && props.errors['fileProofPayment'] ?
                      { display: 'inline-block' } : {}}>
                    {props.errors['fileProofPayment']}
                  </FormFeedback>
                </Col>
              </Row>
            </Col>
          </Row>
        )
      }
    />
  )
})

export default AddDataKasTransaction;
