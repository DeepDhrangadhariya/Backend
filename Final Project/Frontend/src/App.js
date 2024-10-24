import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

import AdminLogin from './components/admin/AdminLogin';
import ManagerLogin from './components/manager/ManagerLogin';
import EmployeeLogin from './components/employee/EmployeeLogin';

import AddAdmin from './components/admin/AddAdmin';
import ViewAdmin from './components/admin/ViewAdmin';
import AddManager from './components/admin/AddManager';
import ViewManager from './components/admin/ViewManager';
import ViewEmployee from './components/admin/ViewEmployee';
import ChangePassword from './components/admin/ChangePassword';
import ForgotPassword from './components/admin/ForgotPassword';
import CheckOtp from './components/admin/CheckOtp';

import MViewManager from './components/manager/ViewManager';
import AddEmployee from './components/manager/AddEmployee';
import MViewEmployee from './components/manager/ViewEmployee';
import MChangePassword from './components/manager/ChangePassword';
import MForgotPassword from './components/manager/ForgotPassword';
import MCheckOtp from './components/manager/CheckOtp';

import EViewEmployee from './components/employee/ViewEmployee';
import EChangePassword from './components/employee/ChangePassword';
import EForgotPassword from './components/employee/ForgotPassword';
import ECheckOtp from './components/employee/CheckOtp';

import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/admin/ProtectedRoute';


function App() {
  return (
    <div className="App">

        <Routes>
          <Route path='/' element={<Dashboard/>} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/manager" element={<ManagerLogin />} />
          <Route path="/employee" element={<EmployeeLogin />} />

          <Route path='/admin/addAdmin' element={<AddAdmin/>} />
          <Route path='/admin/viewAdmin' element={<ProtectedRoute> <ViewAdmin/> </ProtectedRoute>} />
          <Route path='/admin/addManager' element={<AddManager/>} />
          <Route path='/admin/viewManager' element={<ViewManager/>} />
          <Route path='/admin/viewEmployee' element={<ViewEmployee/>} />
          <Route path='/admin/changePassword' element={<ChangePassword/>} />
          <Route path='/admin/forgotPassword' element={<ForgotPassword/>} />
          <Route path='/admin/checkOtp' element={<CheckOtp/>} />

          <Route path='/manager/viewManager' element={<MViewManager/>} />
          <Route path='/manager/addEmployee' element={<AddEmployee/>} />
          <Route path='/manager/viewEmployee' element={<MViewEmployee/>} />
          <Route path='/manager/changePassword' element={<MChangePassword/>} />
          <Route path='/manager/forgotPassword' element={<MForgotPassword/>} />
          <Route path='/manager/checkOtp' element={<MCheckOtp/>} />

          <Route path='/employee/viewEmployee' element={<EViewEmployee/>} />
          <Route path='/employee/changePassword' element={<EChangePassword/>} />
          <Route path='/employee/forgotPassword' element={<EForgotPassword/>} />
          <Route path='/employee/checkOtp' element={<ECheckOtp/>} />
        </Routes>

    </div>
  );
}

export default App;
