import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../process/GoogleSheetsProcess';
import Item from '../../components/Item';
import { Button, Input, Label } from '@fluentui/react-components';
import { AddSquare24Filled } from "@fluentui/react-icons";
import Modal from '../../components/Modal';
import { IItemsData } from '../../constants/interfaces/IItemsData';

interface PathPageProps {
  pageName?: any
}
export default function PathPage(props: PathPageProps) {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const [pathData, setPathData] = React.useState<any>([]);
  const [itemsData, setItemsData] = React.useState<any>([]);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [item, setItem] = React.useState<IItemsData>({
    name: '',
    description: '',
    link: '',
    image: '',
    platform: '',
    progress: 0,
    id: ''
  });
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

  const handleEditItem = async () => {
    if (item) {
      var pathId = null //await handleAddItem(item)
      if (pathId !== null)
        setIsEditModalOpen(false);
      else
        setError("item name already exists")

    }
  }

  const openExternalWebsite = (url: string) => {
    window.open(url, '_blank');
  };

  const openEditItemModal = (item: any) => {
    alert("edit item")
  }

  useEffect(() => {
    const fetchUserData = async () => {
      // Get the user's data
      if (user) {
        const userData = await getUserData(user.uid);
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      else {
        navigate('/login');
      }
    }
    fetchUserData();
    var userData = localStorage.getItem('userData')
    var userDataJson = JSON.parse(userData!)
    var pathData = userDataJson.find((path: any) => path.id === pathId)

    setPathData(pathData)
    pathData && setItemsData(pathData.items)

    pathData && page.setPageName(pathData.pathName);

  }, []);
  return (<div>

    {/* 
   <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        {pathData ? (itemsData).map((item: any) => {
          return <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <h3>{item.name}</h3>
            <img src={item.image} style={{ width: "100px", height: "100px" }} />
          </div>
        }) : <h3>no items</h3>}
      </div>
    </div>
   */}

    <div style={{ marginBottom: "20px", display: "block", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>

      <Item
        itemDescription={'Deneme'}
        itemName={'Deneme'}
        progress={''}
        navigateToItemLink={() => openExternalWebsite("https://www.google.com")}
        openEditItemModal={undefined}
        itemImage={''} platform={''} id={''} />

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {itemsData.map((item: any) => (
          <div id={item.id} key={item.id} style={{ margin: "50px", flex: "0 0 calc(10% - 100px)" }}>
            <Item
              id={item.id}
              platform={item.platform}
              itemDescription={item.description}
              itemName={item.name}
              progress={item.progress}
              navigateToItemLink={() => openExternalWebsite(item.link)}
              openEditItemModal={() => openEditItemModal(item)}
              itemImage={item.image}
            />
          </div>
        ))}
        <Button
          onClick={() => setIsEditModalOpen(true)}
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

    </div>

    <Modal
      setIsOpen={() => setIsEditModalOpen(false)}
      isOpen={isEditModalOpen}
      dialogTitle={'edit item'}
      handleSubmit={() => handleEditItem()}
      dialogBody={
        <div style={{ display: "flex", flexDirection: "column", rowGap: "10px" }}>
          <Label required htmlFor={"name"}>
            item name
          </Label>
          <Input required type="text" id={"name"} placeholder='item name' onChange={(e: any) => handleItemChange(e)} />
          <Label required htmlFor={"description"}>
            item description
          </Label>
          <Input required type="text" id={"description"} placeholder='item description' onChange={(e: any) => handleItemChange(e)} />
          <Label required htmlFor={"link"}>
            item link
          </Label>
          <Input required type="text" id={"link"} placeholder='item link' onChange={(e: any) => handleItemChange(e)} />
          <Label required htmlFor={"image"}>
            item image
          </Label>
          <Input required type="text" id={"image"} placeholder='item image' onChange={(e: any) => handleItemChange(e)} />
          <Label required htmlFor={"platform"}>
            item platform
          </Label>
          <Input required type="text" id={"platform"} placeholder='item platform' onChange={(e: any) => handleItemChange(e)} />
          <Label required htmlFor={"progress"}>
            item progress
          </Label>
          <Input required type="text" id={"progress"} placeholder='item progress' onChange={(e: any) => handleItemChange(e)} />
          <Label htmlFor={"item-name-input"} style={{ color: "#f26257" }}>
            {error}
          </Label>
        </div>

      }
    />
  </div>)
}
