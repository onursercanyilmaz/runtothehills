import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../process/GoogleSheetsProcess';
import Item from '../../components/Item';
import { Button, Input, Label } from '@fluentui/react-components';
import { AddSquare24Filled, BorderNone24Filled } from "@fluentui/react-icons";
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

    <div style={{ marginBottom: "20px", display: "block", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>




      {itemsData.length > 0 ? itemsData.map((item: any) => {
        return (<Item
          key={item.id}
          itemDescription={item.description}
          itemName={item.name}
          progress={item.progress}
          navigateToItemLink={() => openExternalWebsite(item.link)}
          openEditItemModal={() => { setIsEditModalOpen(true); setItem(item) }}
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

    <Modal
      setIsOpen={() => { setIsEditModalOpen(false); setItem(defaultItem) }}
      isOpen={isEditModalOpen}
      dialogTitle={'edit item'}
      handleSubmit={() => handleEditItem()}
      dialogBody={
        <ItemInput item={item} error={error} handleItemChange={handleItemChange} />

      }
    />
  </div>)
}
