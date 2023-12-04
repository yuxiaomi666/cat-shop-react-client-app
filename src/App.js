import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';


const App = () => {


  return (
    <>
      <Header />
    </>
  );
};

export default App;
