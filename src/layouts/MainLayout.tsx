import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './NavBar';
import './MainLayout.scss';


const MainLayout: React.FC = () => {
  return (
    <Container>
      <NavBar />
      {/* The Outlet renders child routes */}
      <Outlet />
    </Container >
  );
};

export default MainLayout;