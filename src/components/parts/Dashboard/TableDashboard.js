import React from 'react';
import { Badge } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { LoadingFilter, RenderPaginationPanel } from '../../common';
import NullPhoto from '../../../assets/null-photo.png';
import { compare, formatTime } from '../../../configs';

const TableDashboard = React.memo(({
  getAllAbsentData,
  getAllAbsentLoading
}) => {
  const options = {
    sortIndicator: true,
    hideSizePerPage: false,
    paginationSize: window.innerWidth <= 1000 ? window.innerWidth <= 380 ? 1 : 2 : 4,
    hidePageListOnlyOnePage: false,
    paginationShowsTotal: true,
    clearSearch: false,
    alwaysShowAllBtns: false,
    withFirstAndLast: false,
    paginationPanel: RenderPaginationPanel
  }

  const indexN = (cell, row, enumObject, index) => <div>{index + 1}</div>

  const statusFormat = (cell, row) => (
    <Badge
      pill
      className='status-attendance'
      color={row.status === '1' ? 'info' : row.status === '2' ? 'success' : row.status === '3' ? 'warning' : 'danger'}>
      {row.status === '1' ? 'On Work' : row.status === '2' ? 'Selesai' : row.status === '3' ? 'Izin' : 'Tidak Hadir'}
    </Badge>
  );

  const imageFormatter = (cell, row) => (
    <div className='p-1'>
      <Zoom zoomMargin={40}>
        <img
          src={row.imageOut ? row.imageOut : row.imageIn ? row.imageIn : NullPhoto}
          alt='img-absent'
          className='img-fluid'
          style={{ width: 60, height: 60, borderRadius: '50%' }}
          onError={(e) => { e.target.onerror = null; e.target.src = NullPhoto }}
        />
      </Zoom>
    </div>
  );

  return (
    <div>
      {getAllAbsentLoading ?
        <LoadingFilter textdesc='Searching data...' className='mt-4 mb-4' />
        :
        <BootstrapTable
          data={getAllAbsentData ? getAllAbsentData : []}
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
            width='150'
            dataFormat={imageFormatter}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Image
          </TableHeaderColumn>
          <TableHeaderColumn
            isKey
            width='200'
            dataField='userId.nim'
            dataFormat={(cell, row) => (<span>{row.userId.nim}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            NIM
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='userId.username'
            dataFormat={(cell, row) => (<span>{row.userId.username}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Nama
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='userId.divisi'
            dataFormat={(cell, row) => (<span>{row.userId.divisi}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Divisi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataFormat={(cell, row) => (<span>{formatTime(row.timeIn)}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Jam Masuk
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataFormat={(cell, row) => (<span>{formatTime(row.timeOut)}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Jam Keluar
          </TableHeaderColumn>
          <TableHeaderColumn
            width='300'
            dataField='location'
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle', textTransform: 'capitalize' }}>
            Lokasi Absen
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
        </BootstrapTable>
      }
    </div>
  )
}, compare)

export default TableDashboard
