import React, { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { usePage } from '../../contexts/PageContext';
import Modal from '../../components/Modal';
import CButton from '../../components/CButton';
import { AddCircle32Filled, AppsListDetail24Filled } from "@fluentui/react-icons";
import { Input, Label } from '@fluentui/react-components';
import { getUserData, addPath, addItemToPath } from '../../process/GoogleSheetsProcess';
import { useNavigate } from 'react-router-dom';
import path from 'path';
import { IPathData } from '../../constants/interfaces/IPathData';

const defaultPathData: IPathData = {
  pathName: "",
  pathId: "",
  items: [],
  pathImage: ""
}

const handleAddPath = async (pathData: IPathData, setUserData: any) => {
  const user = JSON.parse(localStorage.getItem('user')!);

  // Create a new path
  const pathId = await addPath(user.uid, pathData);
  var userData = await getUserData(user.uid);
  localStorage.setItem("userData", JSON.stringify(userData));
  setUserData(userData);

  return pathId;
  //TODO navigate to the new path
}


export default function HomePage() {
  // Use the usePage hook to access pageName and setPageName
  const page = usePage();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')!);
  const [userData, setUserData] = React.useState<any>([]);
  const [path, setPath] = React.useState<IPathData>(defaultPathData);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async () => {
    if (path.pathName !== "") {

      var pathId = await handleAddPath(path, setUserData)
      if (pathId !== null) {

        localStorage.setItem("pathId", pathId);
        setIsOpen(false);
      }
      else
        setError("path name already exists")

    }
  }
  const handlePathChange = (e: any) => {
    if (error !== "")
      setError("");

    setPath((prevItem: any) => ({
      ...prevItem,
      [e.target.id]: e.target.value,
      pathId: e.target.value
        .toLowerCase()
        .replace(/ /g, '-')
        .normalize('NFD') // Normalization Form Canonical Decomposition
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9-]/g, '')
    }));

    console.log(path)
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
      {userData.map((path: IPathData) => (
        <div id={path.pathId} key={path.pathId} style={{ margin: "50px", flex: "0 0 calc(10% - 100px)" }}>
          <CButton style={{
            width: '200px', height: "200px",
            backgroundSize: 'cover', // You can adjust this value as needed
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url("${path.pathImage || null}")`,
            alignItems: path.pathImage ? 'end' : "center",
          }}
            buttonName={path.pathName}
            icon={path.pathImage ? null : <AppsListDetail24Filled />}
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
            <Label required htmlFor={"pathName"}>
              path name
            </Label>
            <Input required type="text" id={"pathName"} placeholder='path name' onChange={(e: any) => handlePathChange(e)} />
            <Label htmlFor={"pathImage"}>
              path image
            </Label>
            <Input type="text" id={"pathImage"} placeholder='path image' onChange={(e: any) => handlePathChange(e)} />
            <Label htmlFor={"path-name-input"} style={{ color: "#f26257" }}>
              {error}
            </Label>
          </>} />
      </div>
    </div>
  );
}



