import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserData } from '../../process/GoogleSheetsProcess';
import Item from '../../components/Item';

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

    <div style={{ display: "block", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Item />
      <Item />
    </div>

  </div>)
}
