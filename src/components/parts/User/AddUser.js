import React, { useRef } from 'react';
import { Formik } from 'formik';
import { Col, Form, Row, Card, CardBody } from 'reactstrap';
import { monts, validate, RegisterUserValidationScheme } from '../../../configs';
import { TextField, SelectField, Button } from '../../common';

const AddUser = ({
  onSubmit,
  registerUserData,
}) => {
  const formRef = useRef();
  const [optionsDateBirth, setOptionsDateBirth] = React.useState({});
  const initialValues = useRef({
    firstName: '',
    lastName: '',
    dateBirth: '',
    monthBirth: '',
    yearBirth: '',
    email: '',
    phonenumber: '',
    nim: '',
    divisi: '',
    gender: '',
    birthPlace: '',
    address: '',
    organisation: '',
    class: ''
  });

  React.useEffect(() => {
    if (registerUserData && formRef.current.handleReset) formRef.current.handleReset();
  }, [registerUserData]);

  const getOptionDate = React.useCallback(() => {
    let Days = [];
    let Months = [];
    let Years = [];
    const currentYear = Number(new Date().getFullYear());
    for (let i = 1; i < 33; i++) {
      Days.push({ value: i < 10 ? `0${i.toString()}` : i.toString(), label: i < 10 ? `0${i.toString()}` : i.toString() });
      if (i < 13) Months.push({ value: i < 10 ? `0${i.toString()}` : i.toString(), label: monts[i - 1] });
    }
    for (let y = currentYear; y >= 1900; y--) {
      Years.push({ value: y.toString(), label: y.toString() });
    }
    setOptionsDateBirth(v => ({ ...v, Days }));
    setOptionsDateBirth(v => ({ ...v, Months }));
    setOptionsDateBirth(v => ({ ...v, Years }));
  }, []);

  React.useEffect(() => getOptionDate(), [getOptionDate]);

  return (
    <Formik
      ref={formRef}
      validate={validate(RegisterUserValidationScheme)}
      initialValues={initialValues.current}
      onSubmit={onSubmit}
      render={
        (props) => (
          <Row>
            <Col lg='12'>
              <Form onSubmit={props.handleSubmit} noValidate name='formRegister'>
                <Card className='userform'>
                  <CardBody>
                    <Row>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='firstName'
                          id='firstName'
                          placeholder='Nama Depan'
                          label='Nama Depan'
                        />
                      </Col>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='lastName'
                          id='lastName'
                          placeholder='Nama Belakang'
                          label='Nama Belakang'
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='4'>
                        <SelectField
                          {...props}
                          name='dateBirth'
                          id='dateBirth'
                          options={optionsDateBirth.Days && optionsDateBirth.Days}
                          isLoading={!optionsDateBirth.Days}
                          placeholder='Tanggal'
                          label='Tanggal Lahir'
                        />
                      </Col>
                      <Col lg='4'>
                        <SelectField
                          {...props}
                          name='monthBirth'
                          id='monthBirth'
                          options={optionsDateBirth.Months && optionsDateBirth.Months}
                          isLoading={!optionsDateBirth.Months}
                          placeholder='Bulan'
                          hideLabel
                          label='c'
                        />
                      </Col>
                      <Col lg='4'>
                        <SelectField
                          {...props}
                          name='yearBirth'
                          id='yearBirth'
                          options={optionsDateBirth.Years && optionsDateBirth.Years}
                          isLoading={!optionsDateBirth.Years}
                          placeholder='Tahun'
                          hideLabel
                          label='d'
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className='userform'>
                  <CardBody>
                    <Row>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='email'
                          id='email'
                          placeholder='Email'
                          label='Email'
                          textTransform='none'
                        />
                      </Col>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='phonenumber'
                          id='phonenumber'
                          placeholder='Nomor HP'
                          label='Nomor HP'
                          maxLength='13'
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='nim'
                          id='nim'
                          placeholder='NIM'
                          label='NIM'
                          maxLength='15'
                        />
                      </Col>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='class'
                          id='class'
                          placeholder='Kelas'
                          label='Kelas'
                          textTransform='capitalize'
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg='6'>
                        <SelectField
                          {...props}
                          type='text'
                          name='gender'
                          id='gender'
                          options={[{ value: 'male', label: 'Pria' }, { value: 'female', label: 'Wanita' }]}
                          placeholder='Gender'
                          label='Gender'
                        />
                      </Col>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='birthPlace'
                          id='birthPlace'
                          placeholder='Tempat Lahir'
                          label='Tempat Lahir'
                          textTransform='capitalize'
                        />
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className='userform mb-5'>
                  <CardBody>
                    <Row>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='organisation'
                          id='organisation'
                          placeholder='Organisasi'
                          label='Organisasi'
                          textTransform='capitalize'
                        />
                      </Col>
                      <Col lg='6'>
                        <TextField
                          {...props}
                          type='text'
                          name='divisi'
                          id='divisi'
                          placeholder='Divisi'
                          label='Divisi'
                          textTransform='capitalize'
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <TextField
                          {...props}
                          type='text'
                          name='address'
                          id='address'
                          placeholder='Alamat Tinggal'
                          label='Alamat Tinggal'
                          textTransform='capitalize'
                        />
                      </Col>
                    </Row>
                    <Row className='mt-3 mb-2'>
                      <Col className='d-flex flex-row align-items-center justify-content-end'>
                        <Button
                          isDanger
                          type='link'
                          href='/user'
                          icon='fa fa-times-circle mr-2 font-lg'>Cancel</Button>
                        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                        <Button
                          isPrimary
                          type='submit'
                          icon='fa fa-save mr-2 font-lg'>Submit</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Form>
            </Col>
          </Row>
        )
      }
    />
  )
}

export default AddUser;
