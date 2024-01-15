// LoginPage.js
import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import GoogleAuth from '../../components/GoogleAuth';

const LoginPage = () => {
  const page = usePage();

  useEffect(() => {
    page.setPageName("Login");
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <img src="logo192.png" style={{ margin: "200px", marginBottom: "5px" }} alt="Login Page" />
      <h1 style={{ marginBottom: "100px" }}>run to the hills</h1>
      <GoogleAuth />
    </div>
  );
};

export default LoginPage;
