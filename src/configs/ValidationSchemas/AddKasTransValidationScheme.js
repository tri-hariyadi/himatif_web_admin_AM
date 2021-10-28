import * as Yup from 'yup';

export const AddKasTransValidationScheme = () => {
  return Yup.object().shape({
    userName: Yup.string()
      .min(3, 'User minimal 3 karakter')
      .matches(/^[a-zA-Z ]+$/, 'User hanya boleh huruf alfabet')
      .required('User harus diisi!'),
    totalPay: Yup.string()
      .required('Total Pemasukan/Pengeluaran harus diisi!'),
    desc: Yup.string()
      .min(10, 'Deskripsi Transaksi minimal 10 karakter')
      .matches(/^[a-zA-Z ]+$/, 'Deskripsi Transaksi hanya boleh huruf alfabet')
      .required('Deskripsi Transaksi harus diisi!'),
    fileProofPayment: Yup.string()
      .required('Bukti Transaksi harus diupload!'),
    fileType: Yup.string()
      .test('is-image', 'Tipe file hanya boleh jpg/jpeg/png', (value) => value === 'image/jpeg')
  })
}