import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import GoogleAuth from '../../components/GoogleAuth';

export default function LoginPage() {
  const page = usePage();
  useEffect(() => {
    page.setPageName("Login");
  }
    , []);
  return <div>
    hi
  </div>;
}
