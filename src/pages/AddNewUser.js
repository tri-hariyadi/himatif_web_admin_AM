import React, { useEffect } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { AddUser } from '../components';
import { registerUser, resetAllUserReducer } from '../store';
import Spinner from '../assets/swal-spinner.gif';

const mapStateToProps = state => ({
  registerUserLoading: state.UserReducer.registerUserLoading,
  registerUserData: state.UserReducer.registerUserData,
  registerUserError: state.UserReducer.registerUserError,
});

const AddNewUser = props => {
  const { registerUser, resetAllUserReducer, registerUserLoading,
    registerUserData, registerUserError } = props;

  useEffect(() => {
    const bodyElem = document.querySelector('body');
    if (bodyElem) bodyElem.style.backgroundColor = '#FFF';

    return () => {
      if (bodyElem) bodyElem.style.backgroundColor = '#e4e5e6';
      resetAllUserReducer();
    }
  }, [resetAllUserReducer]);

  useEffect(() => {
    if (registerUserLoading) swal({
      title: 'Mendaftarkan User',
      text: 'Harap Menunggu',
      icon: Spinner,
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false
    });
    else if (registerUserData) swal('Success', 'Berhasil mendaftarkan user baru!', 'success');
    else if (registerUserError) swal('Gagal', registerUserError, 'error');
  }, [registerUserLoading, registerUserData, registerUserError]);

  const onSubmit = values => {
    const pattern = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const payload = {
      username: [values.firstName, values.lastName].join(' '),
      email: values.email,
      phonenumber: values.phonenumber,
      password: Array(8).fill(pattern).map((x) => x[Math.floor(Math.random() * x.length)]).join(''),
      organisation: values.organisation,
      divisi: values.divisi,
      class: values.class,
      nim: values.nim,
      birthDate: `${values.yearBirth.value}-${values.monthBirth.value}-${values.dateBirth.value}`,
      birthPlace: values.birthPlace,
      gender: values.gender.value,
      address: values.address,
    }
    console.log(payload);
    registerUser(payload)
  }

  return (
    <Row className='animated fadeIn container-fluid' style={{ width: 'auto' }}>
      <Col>
        <div className='mb-4 ml-1'>
          <h4>Silahkan isi form berikut ini untuk menambahkan anggota baru</h4>
        </div>
        <AddUser {...props} onSubmit={onSubmit} />
      </Col>
    </Row>
  )
}

export default connect(mapStateToProps, { registerUser, resetAllUserReducer })(AddNewUser);
