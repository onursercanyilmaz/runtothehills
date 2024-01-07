import * as React from "react";
import { CardHeader } from "@fluentui/react-components";
import {
  makeStyles,
  shorthands,
  Button,
  Body1,
  Caption1,
} from "@fluentui/react-components";
import { FluentProvider, webDarkTheme, Theme } from '@fluentui/react-components';
import { usePage } from "../contexts/PageContext";
import { PersonaCard } from "./PersonaCard";
import { useLocation, useNavigate } from "react-router-dom";


const useStyles = makeStyles({
  
  container: {
    backgroundColor: webDarkTheme.colorBrandShadowKey,
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    ...shorthands.padding("16px"),
    ...shorthands.gap("16px"),
  },
  header: {
  },
});

const resolveAsset = (asset: string) => {

  return `${asset}`;
};

 const Navbar = () => {
  const styles = useStyles();
  const page  = usePage();
  const navigate = useNavigate();
  const location = useLocation();



  const logoURL = resolveAsset("logo32.png");


  return (
    <div className={styles.container}>
      
      <CardHeader
      onClick={()=> (location.pathname!=="/") && navigate("/")}
      style={{cursor:"pointer"}}
        className={styles.header}
        image={{
          as: "img",
          src: logoURL,
          alt: "run to the hills logo",
          width: "32px",
        }}
        header={
          <Body1 style={{paddingTop:"5px"}}>
            <b>run to the hills</b>
          </Body1>
        }
   
      />
       <CardHeader
        className={styles.header}
        
        header={
          <Body1 style={{paddingTop:"5px"}}>
            <b>{page.pageName}</b>
          </Body1>
        }
   
      />
       <CardHeader
        className={styles.header}
       
        header={
          <Body1 style={{paddingTop:"5px"}}>
           <PersonaCard username="Onur Sercan Yılma"/>
          </Body1>
        }
   
      />

    </div>
  );
};

export default Navbar;