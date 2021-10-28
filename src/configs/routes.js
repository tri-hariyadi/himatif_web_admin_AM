import React from 'react';

const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Absents = React.lazy(() => import('../pages/Absents'));
const User = React.lazy(() => import('../pages/User'));
const AddNewUser = React.lazy(() => import('../pages/AddNewUser'));
const Reimbursement = React.lazy(() => import('../pages/Reimbursement'));
const Setting = React.lazy(() => import('../pages/Setting'));
const Kas = React.lazy(() => import('../pages/Kas'));
const AddKasTransaction = React.lazy(() => import('../pages/AddKasTransaction'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
  { path: '/absents', exact: true, name: 'Absents', component: Absents },
  { path: '/user', exact: true, name: 'User', component: User },
  { path: '/user/addnewuser', exact: true, name: 'Add New User', component: AddNewUser },
  { path: '/reimbursement', exact: true, name: 'Reimbursement', component: Reimbursement },
  { path: '/settings', exact: true, name: 'Settings', component: Setting },
  { path: '/kastransaction', exact: true, name: 'Kas', component: Kas },
  { path: '/kastransaction/addkastransaction', exact: true, name: 'Tambah Data Transaksi Kas', component: AddKasTransaction },
];

export default routes;
