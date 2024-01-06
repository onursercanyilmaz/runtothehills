import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';

interface PathPageProps {
    pageName?:any
  }
export default function PathPage(props:PathPageProps) {
    // Use the usePage hook to access pageName and setPageName
    const page = usePage();
 
    useEffect(() => {
      page.setPageName(props.pageName);
    }, []);
  return <div>PathPage</div>;
}
