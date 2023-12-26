import './App.css';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Register from './pages/authentication/Register';
import VerifyEmail from './pages/verifyEmail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout';

function App() {
  const auth = false;
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
          </Route>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/verifyemail' element={<VerifyEmail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
