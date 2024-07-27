import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './redux/store';
import loader from './assets/images/chat-animation-2.gif';
import { GoogleOAuthProvider } from '@react-oauth/google';

function Loading() {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <div className='text-center flex flex-col justify-center items-center'>
        <img className="w-1/5" src={loader} alt="loading..." />
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <Suspense fallback={<Loading />}>
          <App />
          {/* <Loading /> */}
        </Suspense>
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
