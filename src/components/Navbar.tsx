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


const useStyles = makeStyles({
  
  container: {
    backgroundColor: webDarkTheme.colorBrandShadowKey,
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("16px"),
    ...shorthands.gap("16px"),
  },
  header: {
    width: "300px",
  },
});

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    "https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/assets/";

  return `${ASSET_URL}${asset}`;
};

 const Navbar = () => {
  const styles = useStyles();

  const powerpointLogoURL = resolveAsset("pptx.png");

  return (
    <div className={styles.container}>
      
      <CardHeader
        className={styles.header}
        image={{
          as: "img",
          src: powerpointLogoURL,
          alt: "Microsoft PowerPoint logo",
        }}
        header={
          <Body1 style={{paddingTop:"5px"}}>
            <b>run to the hills</b>
          </Body1>
        }
   
      />

    </div>
  );
};

export default Navbar;