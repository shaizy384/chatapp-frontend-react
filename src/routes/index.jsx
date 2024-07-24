import Home from '../pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import VerifyEmail from '../pages/verifyEmail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from '../layout';
import { PublicRoute } from './PublicRoutes';
import Forgot from '../pages/authentication/Forgot';
import ResetPassword from '../pages/authentication/ResetPassword';

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route exact path='/' element={<Layout />}>
            <Route exact path='' element={<Home />} />
            <Route exact path='search' element={<Home />} />
            <Route exact path='verifyemail' element={<VerifyEmail />} />
          </Route>
          <Route exact path='/' element={<PublicRoute />}>
            <Route exact path='login' element={<Login />} />
            <Route exact path='register' element={<Register />} />
            <Route exact path='forgot-password' element={<Forgot />} />
            <Route exact path='/reset-password/:id/:token' element={<ResetPassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routers;
