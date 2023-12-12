import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/bootstrap.custom.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import OtherUserProfileScreen from './screens/OtherUserProfileScreen';
import { Provider } from 'react-redux';
import store from './store';
import { HelmetProvider } from 'react-helmet-async';
import ProductScreen from './screens/ProductScreen';
import { Navigate } from 'react-router-dom';
import Header from './components/Header';
import { Container } from "react-bootstrap";
import OrderScreen from './screens/OrderScreen';


const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <Router>
          <Header />
          < Container >
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home/*" element={<App />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/profile/:id" element={<OtherUserProfileScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/order/:id" element={<OrderScreen />} />
            </Routes>
          </Container>
        </Router>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
