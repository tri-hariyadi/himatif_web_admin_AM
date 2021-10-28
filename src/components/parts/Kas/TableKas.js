import React from 'react';
import { Badge, Tooltip } from 'reactstrap';
import swal from 'sweetalert';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { LoadingFilter, RenderPaginationPanel, Button } from '../../common';
import { currencyFormat, formatDate } from '../../../configs';

import NoImage from '../../../assets/noimage.jpeg';
import Spinner from '../../../assets/swal-spinner.gif';

const TableKas = ({
  getKasData,
  verifyKasTransaction,
  deleteKasTransaction,
  getKasTransaction,
  getKasLoading
}) => {
  const [show, setShow] = React.useState([false]);
  const [show1, setShow1] = React.useState([false]);
  const [show2, setShow2] = React.useState([false]);

  React.useEffect(() => {
    if (getKasData && getKasData.length > 0) {
      let newShow = getKasData.map(() => false);
      setShow(newShow);
    }
  }, [getKasData]);

  const toggle = React.useCallback((i, btn) => {
    if (btn === 'accept') {
      const newArray = show.map((el, idx) => i === idx ? !el : false);
      setShow(newArray);
    }
    if (btn === 'reject') {
      const newArray = show1.map((el, idx) => i === idx ? !el : false);
      setShow1(newArray);
    }
    if (btn === 'delete') {
      const newArray = show2.map((el, idx) => i === idx ? !el : false);
      setShow2(newArray);
    }
  }, [show, show1, show2]);

  const verifyingTransaction = async (row, status) => {
    swal({
      title: 'Konfirmasi',
      text: 'Pastikan verifikasi transaksi sudah benar!, verifikasi tidak akan bisa dibatalkan!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        swal({
          title: 'Verifikasi Transaksi',
          text: 'Harap Menunggu',
          icon: Spinner,
          buttons: false,
          closeOnEsc: false,
          closeOnClickOutside: false
        });
        const result = await verifyKasTransaction({
          role: '1',
          userId: row.userId._id,
          id: row._id,
          status
        });
        if (result) {
          getKasTransaction(JSON.parse(localStorage.getItem('paramGetKasTrans')));
          swal('Success', `Berhasil verifikasi transaksi`, 'success');
        }
        else swal('Error', `Gagal verifikasi transaksi`, 'error');
      }
    });
  }

  const deleteTransaction = async row => {
    swal({
      title: 'Konfirmasi',
      text: 'Yakin ingin menghapus data transaksi ini?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then(async (willDelete) => {
      if (willDelete) {
        swal({
          title: 'Menghapus Transaksi',
          text: 'Harap Menunggu',
          icon: Spinner,
          buttons: false,
          closeOnEsc: false,
          closeOnClickOutside: false
        });
        const result = await deleteKasTransaction({ role: '1', id: row._id });
        if (result) {
          getKasTransaction(JSON.parse(localStorage.getItem('paramGetKasTrans')));
          swal('Success', `Berhasil hapus data transaksi`, 'success');
        }
        else swal('Error', `Gagal hapus data transaksi`, 'error');
      }
    })
  }

  const createCustomExportCSVButton = () => (
    <Button
      isSuccess
      icon='fa fa-file-excel-o mr-2 font-lg'
      onClick={() => exportXLSX()}>Export Excel</Button>
  );

  const options = {
    sortIndicator: true,
    hideSizePerPage: false,
    paginationSize: window.innerWidth <= 1000 ? window.innerWidth <= 380 ? 1 : 2 : 4,
    hidePageListOnlyOnePage: false,
    paginationShowsTotal: true,
    clearSearch: false,
    alwaysShowAllBtns: false,
    withFirstAndLast: false,
    defaultSortOrder: 'desc',
    exportCSVBtn: createCustomExportCSVButton,
    paginationPanel: RenderPaginationPanel
  }

  const indexN = (cell, row, enumObject, index) => <div>{index + 1}</div>

  const statusFormat = (cell, row) => (
    <Badge
      pill
      className='status-attendance'
      color={row.status === 'accept' ? 'success' : row.status === 'processing' ? 'warning' : 'danger'}>
      {row.status === 'accept' ? 'Diterima' : row.status === 'processing' ? 'Untuk Diproses' : 'Ditolak'}
    </Badge>
  );

  const imageFormatter = (cell, row) => (
    <div className='p-1'>
      <Zoom zoomMargin={40}>
        <img
          src={row.proofPayment ? row.proofPayment : NoImage}
          alt='img-absent'
          className='img-fluid'
          style={{ width: 100, height: 70 }}
          onError={(e) => { e.target.onerror = null; e.target.src = NoImage }}
        />
      </Zoom>
    </div>
  );

  const formatAction = (cell, row, formatExtraData, rowIdx) => {
    return (
      <div className='d-flex align-items-center justify-content-center flex-row'
        onMouseLeave={() => {
          setShow([false]);
          setShow1([false]);
          setShow2([false]);
        }}
      >
        <Button
          isSuccess
          isDisabled={row.status === 'accept' || row.status === 'reject'}
          icon='fa fa-check-square-o font-lg'
          id={`TooltipAccept`}
          onClick={() => verifyingTransaction(row, 'accept')}
          className={(row.status !== 'accept' || row.status !== 'reject') ? 'd-flex align-items-center justify-content-center' : ''}
          style={{ borderRadius: '50%', width: 42, height: 42 }} />
        <Tooltip placement='left' isOpen={show[rowIdx]} target={`TooltipAccept`} toggle={() => toggle(rowIdx, 'accept')}>
          {row.status === 'accept' ? 'Transaksi diterima' : row.status === 'reject' ? 'Transaksi telah ditolak' : 'Terima transaksi'}
        </Tooltip>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Button
          isWarning
          isDisabled={row.status === 'accept' || row.status === 'reject'}
          icon='fa fa-eject font-lg'
          id='TooltipEject'
          onClick={() => verifyingTransaction(row, 'reject')}
          className={(row.status !== 'accept' || row.status !== 'reject') ? 'd-flex align-items-center justify-content-center' : ''}
          style={{ borderRadius: '50%', width: 42, height: 42 }} />
        <Tooltip placement='left' isOpen={show1[rowIdx]} target='TooltipEject' toggle={() => toggle(rowIdx, 'reject')}>
          {row.status === 'accept' ? 'Tidak bisa reject transaksi yg telah diterima' : row.status === 'reject' ? 'Transaksi telah ditolak' : 'Tolak transaksi'}
        </Tooltip>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Button
          isDanger
          icon='fa fa-trash font-lg'
          id='TooltipDel'
          onClick={() => deleteTransaction(row)}
          style={{ borderRadius: '50%', width: 42, height: 42 }} />
        <Tooltip placement='top' isOpen={show2[rowIdx]} target='TooltipDel' toggle={() => toggle(rowIdx, 'delete')}>
          Hapus Transaksi
        </Tooltip>
      </div>
    )
  }

  const exportXLSX = React.useCallback(() => {
    if (getKasData && getKasData.length > 0) {
      const data_transaction_kas = getKasData.map(item => ({
        'NIM': item.userId.nim,
        'Nama': item.userId.username,
        'Divisi': item.userId.divisi,
        'Tipe Transaksi': item.typeTransaction === 'income' ? 'Pemasukan Kas' : 'Pengeluaran Kas',
        'Deskripsi Transaksi': item.desc,
        'Total Bayar': currencyFormat(item.totalPay),
        'Tanggal Transaksi': formatDate(new Date(item.dateTransaction)),
        'Status': item.status === 'accept' ? 'Diterima' : item.status === 'processing' ? 'Untuk Diproses' : 'Ditolak'
      }));
      let wb = XLSX.utils.book_new();
      wb.Props = {
        Title: 'Excel Data Transaksi Kas',
        Subject: 'File',
        Author: 'Admin Absensi Mobile',
        CreatedDate: new Date()
      };
      wb.SheetNames.push('File Transaksi Kas');
      let ws = XLSX.utils.json_to_sheet([...data_transaction_kas], { header: Object.keys(data_transaction_kas[0]) });
      wb.Sheets['File Transaksi Kas'] = ws;
      let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
      const s2ab = (s) => {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
      }
      saveAs(
        new Blob([s2ab(wbout)],
          { type: 'application/octet-stream' }),
        `Data_transaction_kas-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
      );
    } else {
      swal({
        title: 'Warning',
        text: 'Maaf tidak ada data untuk dieksport',
        icon: 'warning',
      });
    }
  }, [getKasData]);

  return (
    <div>
      {getKasLoading ?
        <LoadingFilter textdesc='Searching data...' className='mt-4 mb-4' />
        :
        <BootstrapTable
          data={getKasData ? getKasData : []}
          options={options}
          version='4'
          striped
          hover
          pagination
          search
          condensed
          exportCSV
          searchPlaceholder='&#61442; Search'>
          <TableHeaderColumn
            width='35'
            dataField='No'
            dataFormat={indexN}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            No
          </TableHeaderColumn>
          <TableHeaderColumn
            width='170'
            dataFormat={imageFormatter}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Bukti Pembayaran
          </TableHeaderColumn>
          <TableHeaderColumn
            isKey
            key={Math.random()}
            width='200'
            dataField='nim'
            dataFormat={(cell, row) => (<span>{row.userId.nim}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            NIM
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='username'
            dataFormat={(cell, row) => (<span>{row.userId.username}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Nama
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='divisi'
            dataFormat={(cell, row) => (<span>{row.userId.divisi}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Divisi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='typeTransaction'
            dataFormat={(cell, row) => (
              <Badge
                pill
                className='status-attendance'
                color={row.typeTransaction === 'income' ? 'success' : 'danger'}>
                {row.typeTransaction === 'income' ? 'Pemasukan Kas' : 'Pengeluaran kas'}
              </Badge>
            )}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Tipe Transaksi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='desc'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Deskripsi Transaksi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='totalPay'
            dataFormat={(cell, row) => (<span>{currencyFormat(row.totalPay)}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle', textTransform: 'capitalize' }}>
            Total Bayar
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='dateTransaction'
            dataFormat={(cell, row) => (<span>{formatDate(new Date(row.dateTransaction))}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle', textTransform: 'capitalize' }}>
            Tanggal Transaksi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='status'
            dataAlign='center'
            dataFormat={statusFormat}
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='action'
            dataAlign='center'
            dataFormat={formatAction}
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Action
          </TableHeaderColumn>
        </BootstrapTable>
      }
    </div>
  )
}

export default TableKas
