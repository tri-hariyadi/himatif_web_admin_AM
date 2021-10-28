import React, { useRef, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import { getAllAbsents, getDataAbsentUsers, resetAllAbsentReducer } from '../store';
import { getUserPayload } from '../configs/constants';
import { formatDate } from '../configs';
import { TableDashboard, CardDataDashboard } from '../components';

const mapStateToProps = state => ({
  getAllAbsentLoading: state.AbsentReducer.getAllAbsentLoading,
  getAllAbsentData: state.AbsentReducer.getAllAbsentData,
})

const Dashboard = props => {
  const { getAllAbsents, getDataAbsentUsers, resetAllAbsentReducer } = props;
  const dataUser = useRef(jwt.decode(getUserPayload()));
  const [dataAbsentUsers, setDataAbsentUsers] = useState(false);

  useEffect(() => {
    getAllAbsents({
      startDate: `${new Date().getFullYear()}-${String((new Date().getMonth() + 1)).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
      endDate: `${new Date().getFullYear()}-${String((new Date().getMonth() + 1)).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`
    });
    const getDataTraficAbsent = async () => {
      const result = await getDataAbsentUsers();
      if (result) setDataAbsentUsers(result);
    }
    getDataTraficAbsent();

    return () => {
      resetAllAbsentReducer();
    }
  }, [getAllAbsents, getDataAbsentUsers, resetAllAbsentReducer]);

  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <h3>Halo, {dataUser.current.username}</h3>
              <h6>Selamat datang di Aplikasi Web Admin Absensi Mobile</h6>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col><h5 className='ml-1'>{formatDate(new Date())}</h5></Col>
      </Row>
      <CardDataDashboard TraficDataAbsentUsers={dataAbsentUsers} />
      <Row><Col><h5 className='ml-1'>Data Absensi per {formatDate(new Date())}</h5></Col></Row>
      <Row className='animated'>
        <Col>
          <Card>
            <CardHeader className='d-flex align-items-center'>
              <i className='fa fa-bars font-xl'></i>
              <h5 className='m-0 ml-1' style={{ fontFamily: 'FSAlbertBold' }}>Status Absensi User</h5>
            </CardHeader>
            <CardBody>
              <TableDashboard {...props} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default connect(mapStateToProps, { getAllAbsents, getDataAbsentUsers, resetAllAbsentReducer })(Dashboard);
