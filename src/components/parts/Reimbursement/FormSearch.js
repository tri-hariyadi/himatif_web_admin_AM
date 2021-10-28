import React from 'react';
import { Formik } from 'formik';
import { Col, Form, Row } from 'reactstrap';
import { compare, SearchValidationSchema, validate } from '../../../configs';
import { SelectField, TextField, Button } from '../../common';

const FormSearch = ({
  onSubmit,
  getAllUserData,
  getAllUserError,
  getAllUserLoading,
  getAllReimbursementLoading,
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
                      isLoading={getAllReimbursementLoading}
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
}

export default React.memo(FormSearch, compare);

// import React from "react";
// import ReactDOM from "react-dom";
// import BootstrapTable from "react-bootstrap-table-next";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
// import "./styles.css";

// const products = [
//   { id: 1, idw: 'HEHE', name: "Item 1", price: 100 },
//   { id: 2, idw: 'HEHE', name: "Item 2", price: 102 }
// ];

// const ProductList = (props) => {
//   const columns = [
//     {
//       dataField: "id",
//       text: "Product ID",
//       headerAttrs: (column, colIndex) => ({
//         colspan: "2"
//       })
//     },
//     {
//       dataField: "idw",
//       // text: "Product Name"
//       headerAttrs: (column, colIndex) => ({
//         hidden: true
//       })
//     },
//     {
//       dataField: "name",
//       text: "Product Name"
//     },
//     {
//       dataField: "price",
//       text: "Product Price",
//     }
//   ];
//   return (
//     <div style={{ padding: "20px" }}>
//       <h1 className="h2">Products</h1>
//       <BootstrapTable keyField="id" data={products} columns={columns} />
//     </div>
//   );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<ProductList />, rootElement);

