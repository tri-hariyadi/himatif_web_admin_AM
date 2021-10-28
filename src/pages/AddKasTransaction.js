import React, { useRef } from 'react';
import swal from 'sweetalert';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Card, CardBody, ModalHeader, ModalFooter } from 'reactstrap';
import { AddDataKasTransaction, Button } from '../components';
import { addKasTransaction } from '../store';
import Spinner from '../assets/swal-spinner.gif';

const AddKasTransaction = ({
  addKasTransaction
}) => {
  const history = useHistory();
  const formRef = useRef();

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    swal({
      title: 'Konfirmasi',
      text: 'Yakin akan menambah data transaksi ?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        swal({
          title: 'Menyimpan Data Transaksi',
          text: 'Harap Menunggu',
          icon: Spinner,
          buttons: false,
          closeOnEsc: false,
          closeOnClickOutside: false
        });
        if (values.totalPay.toString().includes('Rp')) values.totalPay = values.totalPay.toString().replace(/['Rp', '.', \s]/g, '');
        else values.totalPay = values.totalPay.toString();
        const payload = { ...values, typeTransaction: formRef.current.typeTransaction }
        const result = await addKasTransaction(payload);
        if (result) swal('Success', 'Berhasil tambah data transaksi kas!', 'success')
          .then(willDelete => { if (willDelete) history.replace('/kastransaction') });
        else swal('Error', 'Gagal menambahkan data transaksi kas!', 'error');
        setSubmitting(false);
      }
    });
  }

  const handleSubmit = () => {
    if (!(formRef.current && formRef.current.typeTransaction))
      swal('Warning', 'Silahkan pilih Jenis Transaksi terlebih dahulu!', 'warning');
    else if (formRef.current)
      formRef.current.current.handleSubmit();
  }

  return (
    <Card>
      <ModalHeader className='justify-content-center'>
        <div className='d-flex flex-row align-items-center justify-content-center'>
          <h5
            className='m-0 ml-2'
            style={{ fontFamily: 'FSAlbertBold' }}>
            Tambah Data Pengeluaran/Pemasukan Kas
          </h5>
        </div>
      </ModalHeader>
      <CardBody>
        <AddDataKasTransaction ref={formRef} onSubmit={onSubmit} />
      </CardBody>
      <ModalFooter className='mt-4'>
        <Button
          isDanger
          hasShadow
          type='link'
          href='/kastransaction'
          icon='fa fa-times-circle mr-2'>
          Cancel
        </Button>
        <div>&nbsp;</div>
        <Button
          isPrimary
          type='button'
          hasShadow
          isLoading={formRef.current && formRef.current.current.state.isSubmitting}
          onClick={handleSubmit}
          icon='fa fa-paper-plane mr-2'>
          Submit
        </Button>
      </ModalFooter>
    </Card>
  )
}

export default connect(null, { addKasTransaction })(AddKasTransaction)
