import React from 'react';
import propTypes from 'prop-types';
import { Formik } from 'formik';
import { Col, Form, Row } from 'reactstrap';
import { compare, SearchValidationSchema, validate } from '../../../configs';
import { SelectField, TextField, Button } from '../../common';

const FormSearchAbsent = ({
  onSubmit,
  getAllUserData,
  getAllUserError,
  getAllUserLoading,
  getAllAbsentLoading
}) => {
  const initialValues = React.useRef({
    startDate: '',
    endDate: ''
  });

  return (
    <Formik
      initialValues={initialValues.current}
      validate={validate(SearchValidationSchema)}
      onSubmit={onSubmit}
      render={
        (props) => (
          <Row className='login-row-form'>
            <Col lg='12'>
              <Form onSubmit={props.handleSubmit} noValidate name='simpleForm'>
                <Row>
                  <Col lg='6'>
                    <TextField
                      {...props}
                      type='date'
                      name='startDate'
                      id='startDate'
                      placeholder='Tanggal Dari'
                      label='Tanggal Dari'
                    />
                  </Col>
                  <Col lg='6'>
                    <TextField
                      {...props}
                      type='date'
                      name='endDate'
                      id='endDate'
                      placeholder='Tanggal Sampai'
                      label='Tanggal Sampai'
                    />
                  </Col>
                </Row>
                <Row>
                  <Col lg='6'>
                    <SelectField
                      {...props}
                      name='userId'
                      id='userId'
                      placeholder='NIK User'
                      label='NIK User'
                      options={getAllUserData}
                      noOptionsMessage={getAllUserError}
                      isLoading={getAllUserLoading}
                    />
                  </Col>
                  <Col lg='6'>
                    <Button
                      type='submit'
                      isPrimary
                      isLoading={getAllAbsentLoading}
                      hasShadow
                      className='float-right'
                      style={{ paddingRight: '20px', paddingLeft: '20px', marginTop: '2.1rem' }}>
                      <i className='fa fa-search mr-1' /> Search
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        )}
    />
  )
};

FormSearchAbsent.propTypes = {
  onSubmit: propTypes.func,
  getAllUserData: propTypes.oneOfType([propTypes.array, propTypes.bool]),
  getAllUserError: propTypes.oneOfType([propTypes.string, propTypes.bool]),
  getAllUserLoading: propTypes.bool,
  getAllAbsentLoading: propTypes.bool
}

export default React.memo(FormSearchAbsent, compare);
