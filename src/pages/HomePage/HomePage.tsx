import { Button } from '@fluentui/react-components';
import React from 'react';
import { AddCircle32Filled } from "@fluentui/react-icons";

import CButton from '../../components/CButton';

export default function HomePage() {
  return <div style={{margin:"20px"}}>
 
<CButton style={{width:'200px',height:"200px"}} secondaryContent={"Add new path"} onClick={()=>alert("hi")} buttonName={"Add"} icon={<AddCircle32Filled/>}/>

  </div>
}
