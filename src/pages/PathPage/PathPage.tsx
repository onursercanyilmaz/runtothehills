import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { addItemToPath, getUserData } from '../../process/GoogleSheetsProcess';
import Item from '../../components/Item';
import { Button, Input, Label } from '@fluentui/react-components';
import { AddSquare24Filled, BorderNone24Filled, Delete24Filled } from "@fluentui/react-icons";
import Modal from '../../components/Modal';
import { IItemsData } from '../../constants/interfaces/IItemsData';
import ItemInput from '../../components/ItemInput';
import { v4 as uuid } from 'uuid';

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

export default function PathPage(props: PathPageProps) {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const [pathData, setPathData] = React.useState<any>([]);
  const [itemsData, setItemsData] = React.useState<any>([]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState<boolean>(false);
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
      }
      else if (itemAddResult === null)
        setError("item already exists")
      else
        setError("item couldn't added successfully")
    }
  }

  const handleEditItem = async () => {
    debugger
    if (item) {
      var itemAddResult = await addItemToPath(user.uid, pathId, item);
      if (itemAddResult !== null) {
        await fetchUserData();
        arrangePath();
        setIsEditModalOpen(false);
      }
      else if (itemAddResult === null)
        setError("item already exists")
      else
        setError("item couldn't edited successfully")

    }
  }

  const handleDeleteItem = async () => {
    if (item) {
      var itemAddResult = null
      if (itemAddResult !== null)
        setIsEditModalOpen(false);
      else
        setError("item couldn't be deleted")

    }
  }
  const openExternalWebsite = (url: string) => {
    window.open(url, '_blank');
  };

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
          navigateToItemLink={() => openExternalWebsite(item.link)}
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
          backgroundColor: "#1f1f1f",
          border: "var(--strokeWidthThin) solid var(--colorNeutralStroke1)",
        }}
      >
        <AddSquare24Filled />
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
  </div>)
}
