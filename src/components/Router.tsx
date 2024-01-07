import React, {Fragment} from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../pages/LoginPage/LoginPage';
import PathPage from '../pages/PathPage/PathPage';
import HomePage from '../pages/HomePage/HomePage';


export default function Router() {
  return (
    <Fragment>
      <Routes>
        <Route path='/login' Component={LoginPage} />
        <Route path='/path' Component={PathPage} />
        <Route path='/' Component={HomePage} />

      </Routes>
    </Fragment>
  );
}
