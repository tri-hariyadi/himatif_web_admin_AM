import React from 'react';
import propTypes from 'prop-types';
import swal from 'sweetalert';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Badge } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { LoadingFilter, RenderPaginationPanel, Button } from '../../common';
import { formatDate, formatTime, compare } from '../../../configs';
import NullPhoto from '../../../assets/null-photo.png';

const TableAbsent = ({
  getAllAbsentData,
  getAllAbsentLoading
}) => {
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
      color={row.status === '1' ? 'info' : row.status === '2' ? 'success' : row.status === '3' ? 'warning' : 'danger'}>
      {row.status === '1' ? 'On Work' : row.status === '2' ? 'Selesai' : row.status === '3' ? 'Izin' : 'Tidak Hadir'}
    </Badge>
  );

  const imageFormatter = (cell, row) => (
    <div className='p-1'>
      <Zoom zoomMargin={20}>
        <img
          src={row.imageOut ? row.imageOut : row.imageIn ? row.imageIn : NullPhoto}
          alt='img-absent'
          className='img-fluid img-user'
          style={{ width: 100, height: 100 }}
          onError={(e) => { e.target.onerror = null; e.target.src = NullPhoto }}
        />
      </Zoom>
    </div>
  );

  const exportXLSX = React.useCallback(() => {
    if (getAllAbsentData && getAllAbsentData.length > 0) {
      const data_absents = getAllAbsentData.map(item => ({
        'NIM': item.userId.nim,
        'Nama': item.userId.username,
        'Divisi': item.userId.divisi,
        'Tanggal Masuk': formatDate(new Date(item.dateWork)),
        'Jam Masuk': formatTime(item.timeIn),
        'Jam Keluar': formatTime(item.timeOut),
        'Lokasi Absen': item.location,
        'Attendance Tag': item.desc,
        'Status': item.status === '1' ? 'On Work' : item.status === '2' ? 'Selesai' : item.status === '3' ? 'Izin' : 'Tidak Hadir'
      }));
      let wb = XLSX.utils.book_new();
      wb.Props = {
        Title: 'Excel Data Absents User',
        Subject: 'File',
        Author: 'Admin Absensi Mobile',
        CreatedDate: new Date()
      };
      wb.SheetNames.push('File Absent Users');
      let ws = XLSX.utils.json_to_sheet([...data_absents], { header: Object.keys(data_absents[0]) });
      wb.Sheets['File Absent Users'] = ws;
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
        `Data_Absents-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
      );
    } else {
      swal({
        title: 'Warning',
        text: 'Maaf tidak ada data untuk dieksport',
        icon: 'warning',
      });
    }
  }, [getAllAbsentData]);

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
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            NIM
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='userId.username'
            dataFormat={(cell, row) => (<span>{row.userId.username}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Nama
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataField='userId.divisi'
            dataFormat={(cell, row) => (<span>{row.userId.divisi}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Divisi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='200'
            dataFormat={(cell, row) => (<span>{formatDate(new Date(row.dateWork))}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Tanggal Masuk
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataFormat={(cell, row) => (<span>{formatTime(row.timeIn)}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Jam Masuk
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataFormat={(cell, row) => (<span>{formatTime(row.timeOut)}</span>)}
            dataAlign='center'
            dataSort
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
            dataField='desc'
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Attendence Tag
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
};

TableAbsent.propTypes = {
  getAllAbsentData: propTypes.oneOfType([propTypes.array, propTypes.bool]),
  getAllAbsentLoading: propTypes.bool
}

export default React.memo(TableAbsent, compare);
