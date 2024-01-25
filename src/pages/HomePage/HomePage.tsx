import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePage } from '../../contexts/PageContext';
import Modal from '../../components/Modal';
import CButton from '../../components/CButton';
import { AddCircle32Filled } from "@fluentui/react-icons";
import { Input, Label } from '@fluentui/react-components';
import { getUserData, addItemToPath, addPath } from '../../process/GoogleSheetsProcess';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  // Use the usePage hook to access pageName and setPageName
  const page = usePage();
  const navigate = useNavigate();

  useEffect(() => {
    page.setPageName("Home");

    // Get the user's data
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      getUserData(user.uid);
    }
    else {
      navigate('/login');
    }

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

    <ExampleButton />

  </div>
}




const ExampleButton = () => {

  const handleCreatePath = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);

    // Create a new path
    const pathId = await addPath(user.uid, 'deneme');

    console.log('Path created successfully!', pathId);
  };

  const handleAddExampleData = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);

    // Add a new path

    // Add items to the newly created path
    await addItemToPath(user.uid, "8KU0YGhzZhuKsYDuuP3p", {
      itemId: uuidv4(),
      itemName: 'Item 1',
      platformName: 'Platform 1',
      itemLink: 'https://example.com/item1',
      progress: 'In Progress',
    });

    console.log('Example data added successfully!');
  };

  const handleGetData = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);

    // Get the user's data
    const userData = await getUserData(user.uid);

    console.log('User data retrieved successfully!', userData);
  }
  return (
    <>
      <button onClick={handleCreatePath}>
        Create Example Path
      </button>
      <button onClick={handleAddExampleData}>
        Add Example Data
      </button>
      <button onClick={handleGetData}>
        Get Example Data
      </button></>
  );
};

