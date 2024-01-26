import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../process/GoogleSheetsProcess';
import Item from '../../components/Item';
import { Button } from '@fluentui/react-components';
import { AddSquare24Filled } from "@fluentui/react-icons";

interface PathPageProps {
  pageName?: any
}
export default function PathPage(props: PathPageProps) {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const [pathData, setPathData] = React.useState<any>([]);
  const [itemsData, setItemsData] = React.useState<any>([]);
  // Use the usePage hook to access pageName and setPageName
  const page = usePage();
  const user = JSON.parse(localStorage.getItem('user')!);

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
          onClick={() => alert("add new item")}
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

  </div>)
}
