import React from 'react';
import { compare } from '../../../configs';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import {
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Row,
} from 'reactstrap';

const Loading = () => <div className="animated fadeIn pt-1 text-center w-100 h-100 d-flex align-items-end justify-content-center">
  <div className="sk-spinner sk-spinner-pulse mt-1" style={{ backgroundColor: '#FFF' }}></div>
</div>;

const CardDataDashboard = React.memo(({ TraficDataAbsentUsers }) => {
  const [dataAbsentUsers, setDataAbsentUsers] = React.useState({
    "userregistered": {
      "Oktober 2021": 0,
      "September 2021": 0,
      "Agustus 2021": 0,
      "Juli 2021": 0
    },
    "useronwork": {
      "07 Oktober 2021": 0,
      "06 Oktober 2021": 0,
      "05 Oktober 2021": 0,
      "04 Oktober 2021": 0
    },
    "userizin": {
      "07 Oktober 2021": 0,
      "06 Oktober 2021": 0,
      "05 Oktober 2021": 0,
      "04 Oktober 2021": 0
    },
    "usernotactive": {
      "07 Oktober 2021": 0,
      "06 Oktober 2021": 0,
      "05 Oktober 2021": 0,
      "04 Oktober 2021": 0
    },
    "alluserregistered": 0
  });

  React.useEffect(() => {
    if (TraficDataAbsentUsers) setDataAbsentUsers(TraficDataAbsentUsers);
  }, [TraficDataAbsentUsers]);

  const chartUserRegistered = {
    labels: Object.keys(dataAbsentUsers.userregistered).reverse(),
    datasets: [
      {
        label: 'Data User Registered',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: Object.values(dataAbsentUsers.userregistered).reverse()
      },
    ],
  }
  const chartUserOnWork = {
    labels: Object.keys(dataAbsentUsers.useronwork).reverse(),
    datasets: [
      {
        label: 'Data User On Work',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: Object.values(dataAbsentUsers.useronwork).reverse()
      },
    ],
  }
  const chartUserIzin = {
    labels: Object.keys(dataAbsentUsers.userizin).reverse(),
    datasets: [
      {
        label: 'Data User Izin',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: Object.values(dataAbsentUsers.userizin).reverse()
      },
    ],
  }
  const chartUserNotActive = {
    labels: Object.keys(dataAbsentUsers.usernotactive).reverse(),
    datasets: [
      {
        label: 'Data User Tidak Aktif',
        backgroundColor: 'rgba(255,255,255,.2)',
        borderColor: 'rgba(255,255,255,.55)',
        data: Object.values(dataAbsentUsers.usernotactive).reverse()
      },
    ],
  }

  const cardChartOpts1 = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent',
          },
          ticks: {
            fontSize: 2,
            fontColor: 'transparent',
          },
        }],
      yAxes: [
        {
          ticks: {
            fontColor: '#FFF',
            fontFamily: 'FSAlbertLight',
            fontSize: 10,
          },
          gridLines: {
            drawBorder: true,
            color: 'rgba(255,255,255,.2)',
            zeroLineColor: 'rgba(255,255,255,.2)'
          }
        }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1,
      },
      point: {
        radius: 3,
        hitRadius: 10,
        hoverRadius: 4,
      },
    }
  }

  return (
    <Row>
      <Col xs='12' sm='6' lg='3'>
        <Card className='text-white bg-primary'>
          <CardBody className='pb-0'>
            <ButtonGroup className='float-right'>
              <i className='icon-people icons font-2xl'></i>
            </ButtonGroup>
            <div className='text-value'>{dataAbsentUsers.alluserregistered}</div>
            <div>User Terdaftar</div>
            <div className='chart-wrapper mt-3' style={{ height: '80px' }}>
              {TraficDataAbsentUsers ?
                <Line data={chartUserRegistered} options={cardChartOpts1} height={80} />
                : <Loading />
              }
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xs='12' sm='6' lg='3'>
        <Card className='text-white bg-success'>
          <CardBody className='pb-0'>
            <ButtonGroup className='float-right'>
              <i className='icon-user-following icons font-2xl'></i>
            </ButtonGroup>
            <div className='text-value'>{Object.values(dataAbsentUsers.useronwork)[0]}</div>
            <div>User on work</div>
            <div className='chart-wrapper mt-3' style={{ height: '80px' }}>
              {TraficDataAbsentUsers ? <Line data={chartUserOnWork} options={cardChartOpts1} height={80} />
                : <Loading />
              }
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xs='12' sm='6' lg='3'>
        <Card className='text-white bg-warning'>
          <CardBody className='pb-0'>
            <ButtonGroup className='float-right'>
              <i className='icon-people icons font-2xl'></i>
            </ButtonGroup>
            <div className='text-value'>{Object.values(dataAbsentUsers.userizin)[0]}</div>
            <div>User izin</div>
            <div className='chart-wrapper mt-3' style={{ height: '80px' }}>
              {TraficDataAbsentUsers ? <Line data={chartUserIzin} options={cardChartOpts1} height={80} /> : <Loading />}
            </div>
          </CardBody>
        </Card>
      </Col>
      <Col xs='12' sm='6' lg='3'>
        <Card className='text-white bg-danger'>
          <CardBody className='pb-0'>
            <ButtonGroup className='float-right'>
              <i className='icon-people icons font-2xl'></i>
            </ButtonGroup>
            <div className='text-value'>{Object.values(dataAbsentUsers.usernotactive)[0]}</div>
            <div>User tidak aktif</div>
            <div className='chart-wrapper mt-3' style={{ height: '80px' }}>
              {TraficDataAbsentUsers ? <Line data={chartUserNotActive} options={cardChartOpts1} height={80} /> : <Loading />}
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}, compare)

export default CardDataDashboard
