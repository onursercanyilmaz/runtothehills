import React, { useEffect } from 'react';

import { usePage } from '../../contexts/PageContext';
import Modal from '../../components/Modal';
import CButton from '../../components/CButton';
import { AddCircle32Filled } from "@fluentui/react-icons";
import { Input, Label } from '@fluentui/react-components';

export default function HomePage() {
  // Use the usePage hook to access pageName and setPageName
  const page = usePage();

  useEffect(() => {
    page.setPageName("Home");
  }, []);
  return <div style={{ margin: "20px" }}>



    <Modal
      button={<CButton style={{ width: '200px', height: "200px" }} secondaryContent={"add new path"} buttonName={"add"} icon={<AddCircle32Filled />} />}
      dialogTitle={'add new path'}
      handleSubmit={() => alert("add")}
      dialogBody={<>

        <Label required htmlFor={"path-name-input"}>
          path name
        </Label>
        <Input required type="text" id={"path-name-input"} placeholder='path name' />
      </>} />
  </div>
}
