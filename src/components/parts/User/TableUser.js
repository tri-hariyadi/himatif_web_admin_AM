import React from 'react';
import swal from 'sweetalert';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { compare, formatDate } from '../../../configs';
import { LoadingFilter, RenderPaginationPanel, Button } from '../../common';
import NullPhoto from '../../../assets/null-photo.png';
import Spinner from '../../../assets/swal-spinner.gif';

const TableUser = React.memo(({
  getAllUserLoading,
  getAllUserData,
  deleteUserLoading,
  deleteUserData,
  deleteUserError,
  deleteUser,
  getAllUser
}) => {
  const [idUser, setIdUser] = React.useState([]);
  const createCustomExportCSVButton = () => (
    <Button
      isSuccess
      icon='fa fa-file-excel-o mr-2 font-lg'
      onClick={() => exportXLSX()}>Export Excel</Button>
  );

  const createCustomDeleteButton = onClick => (
    <Button
      isDanger
      icon='fa fa-trash mr-2 font-lg'
      onClick={() => deletingUsers(idUser)}>Hapus User</Button>
  )

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
    deleteBtn: createCustomDeleteButton,
    paginationPanel: RenderPaginationPanel
  }

  const imageFormatter = (cell, row) => (
    <div className='p-1'>
      <Zoom zoomMargin={40}>
        <img
          src={row.image ? row.image : NullPhoto}
          alt='img-absent'
          className='img-fluid'
          style={{ width: 60, height: 60 }}
          onError={(e) => { e.target.onerror = null; e.target.src = NullPhoto }}
        />
      </Zoom>
    </div>
  );

  const onRowSelect = (row, isSelected, e) => {
    if (isSelected) setIdUser(idUser => [...idUser, row._id]);
    else setIdUser(idUser => idUser.filter(v => v !== row._id));
  }

  const onSelectAll = (isSelected, rows) => {
    if (isSelected) {
      const usersId = rows.map(item => item._id);
      setIdUser(usersId);
    } else setIdUser([]);
  }

  const selectRowProp = {
    mode: 'checkbox',
    onSelect: onRowSelect,
    onSelectAll: onSelectAll
  };

  React.useEffect(() => {
    if (deleteUserLoading) swal({
      title: 'Menghapus User',
      text: 'Harap Menunggu',
      icon: Spinner,
      buttons: false,
      closeOnEsc: false,
      closeOnClickOutside: false
    });
    if (deleteUserData) {
      getAllUser({ role: '1' }, true);
      swal.close();
    }
    if (deleteUserError) swal({
      title: 'Gagal Menghapus User',
      text: deleteUserError,
      icon: 'error',
    });
  }, [deleteUserLoading, deleteUserData, deleteUserError, getAllUser]);

  const deletingUsers = (payload) => {
    if (payload && payload.length < 1) swal({
      title: 'Warning',
      text: 'Tidak ada user yang dipilih, silahkan pilih user yang akan dihapus dengan mengklik checkbox!',
      icon: 'warning',
    })
    else swal({
      title: "Hapus Data User",
      text: "Apakah anda yakin ingin menghapus data user ini?",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) deleteUser(payload);
    })
  };

  const exportXLSX = React.useCallback(() => {
    if (getAllUserData && getAllUserData.length > 0) {
      const data_user = getAllUserData.map(item => ({
        'Nama': item.username,
        'NIM': item.nim,
        'Email': item.email,
        'Nomor HP': item.phonenumber,
        'Gender': item.gender,
        'Tanggal Lahir': formatDate(new Date(item.birthDate)),
        'Tempat Lahir': item.birthPlace,
        'Divisi': item.divisi,
        'Tanggal Bergabung': formatDate(new Date(item.createdAt))
      }));
      let wb = XLSX.utils.book_new();
      wb.Props = {
        Title: 'Excel Data User',
        Subject: 'File',
        Author: 'Admin Absensi Mobile',
        CreatedDate: new Date()
      };
      wb.SheetNames.push('File Users');
      let ws = XLSX.utils.json_to_sheet([...data_user], { header: Object.keys(getAllUserData) });
      wb.Sheets['File Users'] = ws;
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
        `Data_User-${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}.xlsx`
      );
    } else {
      swal({
        title: 'Warning',
        text: 'Maaf tidak ada data untuk dieksport',
        icon: 'warning',
      });
    }
  }, [getAllUserData]);

  return (
    <div>
      {getAllUserLoading ?
        <LoadingFilter textdesc='Searching data...' className='mt-4 mb-4' />
        :
        <BootstrapTable
          data={getAllUserData ? getAllUserData : []}
          options={options}
          selectRow={selectRowProp}
          version='4'
          striped
          hover
          pagination
          search
          condensed
          exportCSV
          deleteRow
          searchPlaceholder='&#61442; Search'>
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
            width='100'
            dataField='nim'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            NIM
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='username'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Nama
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='divisi'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Divisi
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='email'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Email
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='phonenumber'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Nomor HP
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='birthDate'
            dataFormat={(cell, row) => (<span>{formatDate(new Date(row.birthDate))}</span>)}
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Tanggal Lahir
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='birthPlace'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Tempat Lahir
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='gender'
            dataAlign='center'
            dataSort
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Gender
          </TableHeaderColumn>
          <TableHeaderColumn
            width='100'
            dataField='createdAt'
            dataFormat={(cell, row) => (<span>{formatDate(new Date(row.createdAt))}</span>)}
            dataAlign='center'
            thStyle={{ whiteSpace: 'normal' }}
            tdStyle={{ whiteSpace: 'normal', verticalAlign: 'middle' }}>
            Tanggal Bergabung
          </TableHeaderColumn>
        </BootstrapTable>
      }
    </div>
  )
}, compare);

export default TableUser;
