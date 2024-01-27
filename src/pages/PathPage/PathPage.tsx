import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { addItemToPath, deleteItemFromPath, editPath, getUserData } from '../../process/GoogleSheetsProcess';
import Item from '../../components/Item';
import { Button, Input, Label } from '@fluentui/react-components';
import { AddSquare24Filled, BorderNone24Filled, Delete24Filled, Settings24Filled } from "@fluentui/react-icons";
import Modal from '../../components/Modal';
import { IItemsData } from '../../constants/interfaces/IItemsData';
import ItemInput from '../../components/ItemInput';
import { v4 as uuid } from 'uuid';
import { IPathData } from '../../constants/interfaces/IPathData';

interface PathPageProps {
  pageName?: any
}

const defaultItem: IItemsData = {
  name: "",
  description: "",
  link: "",
  image: "",
  platform: "",
  progress: 0,
  id: uuid()
}

const defaultPathData: IPathData = {
  pathName: "",
  pathId: "",
  items: [],
  pathImage: ""
}

export default function PathPage(props: PathPageProps) {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const [pathData, setPathData] = React.useState<IPathData>(defaultPathData);
  const [itemsData, setItemsData] = React.useState<any>([]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
  const [isEditPathModalOpen, setIsEditPathModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [item, setItem] = React.useState<IItemsData>(defaultItem);
  // Use the usePage hook to access pageName and setPageName
  const page = usePage();
  const user = JSON.parse(localStorage.getItem('user')!);

  const handleItemChange = (e: any) => {
    if (error !== "")
      setError("");

    setItem((prevItem: any) => ({
      ...prevItem,
      [e.target.id]: e.target.value
    }));

  }

  const fetchUserData = async () => {
    // Get the user's data
    if (user) {
      const userData: any = await getUserData(user.uid);
      var data = userData.find((path: any) => path.pathId === pathId)
      if (!data) {
        navigate('/');
        return;
      }
      localStorage.setItem("userData", JSON.stringify(userData));
    }
    else {
      navigate('/login');
    }
  }

  const arrangePath = () => {
    var userData = localStorage.getItem('userData')
    var userDataJson = JSON.parse(userData!)
    var pathData = userDataJson?.find((path: any) => path.pathId === pathId)
    setPathData(pathData)
    pathData && setItemsData(pathData.items)
    pathData && page.setPageName(pathData.pathName);
  }

  const handleAddItem = async () => {
    if (item) {
      item.id = uuid();
      var itemAddResult: any = await addItemToPath(user.uid, pathId, item);
      if (itemAddResult !== null) {
        await fetchUserData();
        arrangePath();
        setIsAddModalOpen(false);
        setItem(defaultItem)
      }
      else if (itemAddResult === null)
        setError("item already exists")
      else
        setError("item couldn't added successfully")
    }
  }

  const handleEditItem = async () => {

    if (item) {
      var itemEditResult = await addItemToPath(user.uid, pathId, item);
      if (itemEditResult !== null) {
        await fetchUserData();
        arrangePath();
        setIsEditModalOpen(false);
        setItem(defaultItem)
      }
      else if (itemEditResult === null)
        setError("item already exists")
      else
        setError("item couldn't edited successfully")

    }
  }

  const handleDeleteItem = async () => {
    if (item) {
      var itemDeleteResult = await deleteItemFromPath(user.uid, pathId, item)
      if (itemDeleteResult !== null) {
        await fetchUserData();
        arrangePath();
        setIsEditModalOpen(false);
      }
      else
        setError("item couldn't be deleted")

    }
  }

  const handleEditPath = async () => {
    if (pathData) {
      setPathData((prevItem: any) => ({
        ...prevItem,
        pathId: pathData.pathName
          .toLowerCase()
          .replace(/ /g, '-')
          .normalize('NFD') // Normalization Form Canonical Decomposition
          .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
          .replace(/[^a-z0-9-]/g, '')
      }));
      var editedPath = pathData
      editedPath.pathId = pathData.pathName
        .toLowerCase()
        .replace(/ /g, '-')
        .normalize('NFD') // Normalization Form Canonical Decomposition
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .replace(/[^a-z0-9-]/g, '')

      var itemEditPathResult = await editPath(user.uid, pathId, editedPath)
      if (itemEditPathResult !== null) {
        await fetchUserData();
        arrangePath();
        setIsEditPathModalOpen(false);
      }
      else if (itemEditPathResult === null)
        setError("path already exists")
      else
        setError("pathcouldn't edited successfully")

    }
  }

  const handlePathChange = (e: any) => {
    if (error !== "")
      setError("");

    setPathData((prevItem: any) => ({
      ...prevItem,
      [e.target.id]: e.target.value,
    }));

    console.log(pathData)

  }

  useEffect(() => {

    fetchUserData();

    arrangePath();

  }, []);

  return (<div>

    <div style={{ marginBottom: "20px", display: "block", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>


      {itemsData.length > 0 ? itemsData.map((item: any) => {
        return (<Item
          key={item.id}
          itemDescription={item.description}
          itemName={item.name}
          progress={item.progress}
          navigateToItemLink={item.link}
          openEditItemModal={() => { setError(""); setIsEditModalOpen(true); setItem(item) }}
          itemImage={item.image}
          platform={item.platform}
          id={item.id}
        />)
      }) :
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "100px", opacity: "0.5" }}>
          <BorderNone24Filled width={"100px"} />
          <Label style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}>no items</Label>
        </div>}

      <Button
        onClick={() => { setError(""); setIsAddModalOpen(true) }}
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          height: "100px",
          marginTop: "20px",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <AddSquare24Filled />
      </Button>
      <Button
        onClick={() => { setError(""); setIsEditPathModalOpen(true) }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          height: "100px",
          marginTop: "20px",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <Settings24Filled />
      </Button>

    </div>

    <Modal
      setIsOpen={() => { setIsEditModalOpen(false); setItem(defaultItem) }}
      isOpen={isEditModalOpen}
      dialogTitle={'edit item'}
      handleSubmit={() => handleEditItem()}
      dialogBody={
        <>
          <ItemInput item={item} error={error} handleItemChange={handleItemChange} />
          <Button style={{ marginTop: "50px", border: "none" }} icon={<Delete24Filled />} content="delete item" onClick={() => { handleDeleteItem() }} />
        </>
      }
    />
    <Modal
      setIsOpen={() => { setIsAddModalOpen(false); setItem(defaultItem) }}
      isOpen={isAddModalOpen}
      dialogTitle={'add item'}
      handleSubmit={() => handleAddItem()}
      dialogBody={
        <ItemInput item={item} error={error} handleItemChange={handleItemChange} />

      }
    />
    <Modal
      setIsOpen={() => { setIsEditPathModalOpen(false); }}
      isOpen={isEditPathModalOpen}
      dialogTitle={'edit path'}
      handleSubmit={() => handleEditPath()}
      dialogBody={<>
        <Label required htmlFor={"pathName"}>
          path name
        </Label>
        <Input required value={pathData.pathName} type="text" id={"pathName"} placeholder='path name' onChange={(e: any) => handlePathChange(e)} />
        <Label htmlFor={"pathImage"}>
          path image
        </Label>
        <Input value={pathData.pathImage} type="text" id={"pathImage"} placeholder='path image' onChange={(e: any) => handlePathChange(e)} />
        <Label htmlFor={"path-name-input"} style={{ color: "#f26257" }}>
          {error}
        </Label>
      </>}

    />
  </div >)
}
