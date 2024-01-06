import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';

export default function LoginPage() {
  const page = usePage();
  useEffect(() => {
    page.setPageName("Login");
  }
  , []);
  return <div>LoginPage</div>;
}
