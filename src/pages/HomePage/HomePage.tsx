import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePage } from '../../contexts/PageContext';
import Modal from '../../components/Modal';
import CButton from '../../components/CButton';
import { AddCircle32Filled, AppsListDetail24Filled } from "@fluentui/react-icons";
import { Input, Label } from '@fluentui/react-components';
import { getUserData, addItemToPath, addPath, addItemToPathTwo } from '../../process/GoogleSheetsProcess';
import { useNavigate } from 'react-router-dom';
import path from 'path';

const handleAddPath = async (pathName: any, setUserData: any) => {
  const user = JSON.parse(localStorage.getItem('user')!);

  // Create a new path
  const pathId = await addPath(user.uid, pathName);
  var userData = await getUserData(user.uid);
  setUserData(userData);

  return pathId;
  //TODO navigate to the new path
}

const handleAddItem = async (pathId: any, itemData: any) => {
  const user = JSON.parse(localStorage.getItem('user')!);

  // Add a new item to the newly created path
  await addItemToPath(user.uid, pathId, itemData);
}

export default function HomePage() {
  // Use the usePage hook to access pageName and setPageName
  const page = usePage();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')!);

  const [userData, setUserData] = React.useState<any>([]);
  const [pathName, setPathName] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async () => {
    if (pathName) {
      var pathId = await handleAddPath(pathName, setUserData)
      if (pathId !== null)
        setIsOpen(false);
      else
        setError("path name already exists")

    }
  }

  const handlePathNameChange = (e: any) => {
    if (error !== "")
      setError("");

    setPathName(e.target.value);
  }

  useEffect(() => {
    page.setPageName("Home");
    const fetchUserData = async () => {
      // Get the user's data
      if (user) {
        const userData = await getUserData(user.uid);
        localStorage.setItem("userData", JSON.stringify(userData));
        setUserData(userData);
      }
      else {
        navigate('/login');
      }
    }

    fetchUserData();


  }, []);


  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {userData.map((path: any) => (
        <div id={path.pathId} key={path.pathId} style={{ margin: "50px", flex: "0 0 calc(10% - 100px)" }}>
          <CButton style={{
            width: '200px', height: "200px",
            backgroundSize: 'cover', // You can adjust this value as needed
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url("${path.pathImage || null}")`
          }}
            buttonName={path.pathName}
            icon={<AppsListDetail24Filled />}
            onClick={() => navigate("/path/" + path.pathId)} />
        </div>
      ))}

      <div id="add-new-path" style={{ margin: "50px", flex: "0 0 calc(10% - 100px)" }}>
        <Modal
          button={<CButton style={{ width: '200px', height: "200px" }} secondaryContent={"add new path"} buttonName={"add"} icon={<AddCircle32Filled />} onClick={() => setIsOpen(true)} />}
          dialogTitle={'add new path'}
          handleSubmit={() => handleSubmit()}
          isOpen={isOpen}
          setIsOpen={() => { setIsOpen(false); setError("") }}
          dialogBody={<>
            <Label required htmlFor={"path-name-input"}>
              path name
            </Label>
            <Input required type="text" id={"path-name-input"} placeholder='path name' onChange={(e: any) => handlePathNameChange(e)} />
            <Label htmlFor={"path-name-input"} style={{ color: "#f26257" }}>
              {error}
            </Label>
          </>} />
      </div>

      <ExampleButton />
    </div>
  );
}




const ExampleButton = () => {

  const handleCreatePath = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);

    // Create a new path
    const pathId = await addPath(user.uid, '.net journey', "https://play-lh.googleusercontent.com/yKB0JstxXgmfTkXMHJ5FYJlEwB3xExjlbSjSOSiZrPabINifoSlGzwhDgzqdpqeMiZY=w240-h480-rw");

    console.log('Path created successfully!', pathId);
  };

  const handleAddExampleData = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);

    // Add a new path

    // Add items to the newly created path
    await addItemToPathTwo(user.uid, 'net-journey', {
      id: uuidv4(),
      name: 'c# basics',
      image: 'https://play-lh.googleusercontent.com/dsCkmJE2Fa8IjyXERAcwc5YeQ8_NvbZ4_OI8LgqyjILpXUfS5YhEcnAMajKPrZI-og=s48-rw',
      description: 'c# intoduction',
      link: 'https://play.google.com/store/apps/details?id=com.csharp.champ&hl=en_US',
      progress: 20,
      platform: 'udemy'
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

