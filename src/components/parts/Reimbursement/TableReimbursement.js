import React from 'react';
import { Badge, Tooltip } from 'reactstrap';
import swal from 'sweetalert';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { LoadingFilter, RenderPaginationPanel, Button } from '../../common';
import ModalPayout from './ModalPayout';
import ModalDetail from './ModalDetail';
import { formatDate, compare, currencyFormat } from '../../../configs';
import { updateReimbursement, deleteReimbursement } from '../../../store';
import NoImage from '../../../assets/noimage.jpeg';
import { connect } from 'react-redux';

const TableReimbursement = ({
  getAllReimbursementData,
  getAllReimbursementLoading,
  updateReimbursement,
  deleteReimbursement
}) => {
  const [tooltipShow1, setTooltipShow1] = React.useState(false);
  const [tooltipShow2, setTooltipShow2] = React.useState(false);

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

  const formatAction = (cell, row) => {
    let elem = document.querySelector('.tooltip.show.bs-tooltip-auto');
    if (elem) elem.style.top = '23px';
    return (
      <div className='d-flex align-items-center justify-content-center flex-row'>
        {row.status === 'accept' ? <ModalDetail row={row} /> : <ModalPayout row={row} />}
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Button
          isWarning
          icon='fa fa-eject font-lg'
          id='TooltipEject'
          onClick={() => rejectReimbursement(row)}
          style={{ borderRadius: '50%', width: 42, height: 42 }} />
        <Tooltip placement='left' isOpen={tooltipShow1} target='TooltipEject' toggle={() => setTooltipShow1(v => !v)}>
          {row.status === 'accept' ? 'Tidak bisa reject reimbursement yg telah diterima' : 'Tolak Transaksi'}
        </Tooltip>
        <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
        <Button
          isDanger
          icon='fa fa-trash font-lg'
          id='TooltipDel'
          onClick={() => deleteDataReimbursement(row._id, row.status)}
          style={{ borderRadius: '50%', width: 42, height: 42 }} />
        <Tooltip placement='top' isOpen={tooltipShow2} target='TooltipDel' toggle={() => setTooltipShow2(v => !v)}>
          Hapus Transaksi
        </Tooltip>
      </div>
    )
  }

  const deleteDataReimbursement = (id, status) => {
    if (status === 'accept') swal({
      title: 'Confirmation',
      text: 'Apakah anda yakin ingin menghapus data Reimbursement ini?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) deleteReimbursement({ id });
    })
    else swal('Warning', 'Harap lakukan konfimasi terima atau reject reimbursement terlebih dahulu', 'warning');
  }

  const rejectReimbursement = payload => {
    if (payload.status !== 'accept') swal({
      title: 'Reject Data Reimbursement',
      text: 'Apakah anda yakin ingin menolak data Reimbursement ini?',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) updateReimbursement({
        id: payload.id,
        Status: payload.status,
        TransactionID: '',
        TransactionDate: '',
        ReferenceID: ''
      });
    })
    else swal('Warning', 'Tidak dapat melakukan reject pada reimbursement yang telah diterima!', 'warning');
  }

  return (
    <div>
      {getAllReimbursementLoading ?
        <LoadingFilter textdesc='Searching data...' className='mt-4 mb-4' />
        :
        <BootstrapTable
          data={getAllReimbursementData ? getAllReimbursementData : []}
          options={options}
          version='4'
          striped
          hover
          pagination
          search
          condensed
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
            Image
          </TableHeaderColumn>
          <TableHeaderColumn
            isKey
            width='200'
            dataField='nim'
            dataFormat={(cell, row) => (<span>{row.userId.nim}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            NIK
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
            dataField='reimbursementName'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Nama Reimbursement
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='reimbursementDate'
            dataFormat={(cell, row) => (<span>{formatDate(new Date(row.reimbursementDate))}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Tanggal
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='desc'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Deskripsi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='300'
            dataField='location'
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle', textTransform: 'capitalize' }}>
            Lokasi Tugas
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='totalPay'
            dataFormat={(cell, row) => (<span>{currencyFormat(row.totalPay)}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle', textTransform: 'capitalize' }}>
            Total Reimbursement
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

export default React.memo(connect(null, {
  updateReimbursement,
  deleteReimbursement
})(TableReimbursement), compare);
