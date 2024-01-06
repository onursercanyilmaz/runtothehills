import { Button } from '@fluentui/react-components';
import React, { useEffect } from 'react';
import { AddCircle32Filled } from "@fluentui/react-icons";

import CButton from '../../components/CButton';
import { usePage } from '../../contexts/PageContext';

export default function HomePage() {
  // Use the usePage hook to access pageName and setPageName
  const page = usePage();
 
  useEffect(() => {
    page.setPageName("Home");
  }, []);
  return <div style={{margin:"20px"}}>
 
<CButton style={{width:'200px',height:"200px"}} secondaryContent={"add new path"} onClick={()=>alert("hi")} buttonName={"add"} icon={<AddCircle32Filled/>}/>

  </div>
}
