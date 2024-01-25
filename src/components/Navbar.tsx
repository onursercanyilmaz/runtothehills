import * as React from "react";
import { CardHeader, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from "@fluentui/react-components";
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
import { SignOut20Filled } from "@fluentui/react-icons";


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
  const page = usePage();
  const navigate = useNavigate();
  const location = useLocation();

  var user = JSON.parse(localStorage.getItem("user")!);



  const logoURL = resolveAsset("logo32.png");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className={styles.container}>

      <CardHeader
        onClick={() => (location.pathname !== "/") && navigate("/")}
        style={{ cursor: "pointer" }}
        className={styles.header}
        image={{
          as: "img",
          src: logoURL,
          alt: "run to the hills logo",
          width: "32px",
        }}
        header={
          <Body1 style={{ paddingTop: "5px" }}>
            <b>run to the hills</b>
          </Body1>
        }

      />
      <CardHeader
        className={styles.header}

        header={
          <Body1 style={{ paddingTop: "5px" }}>
            <b>{page.pageName}</b>
          </Body1>
        }

      />
      <CardHeader
        className={styles.header}

        header={
          <Body1 style={{ paddingTop: "5px" }}  >

            <Menu>
              <MenuTrigger disableButtonEnhancement>
                <Button style={{ border: "none", background: "transparent" }}> <PersonaCard username={user?.displayName} /></Button>
              </MenuTrigger>

              <MenuPopover>
                <MenuList>
                  <MenuItem style={{ padding: "0px" }} onClick={() => handleLogout()}>
                    <Button style={{ width: "100%" }}> <SignOut20Filled style={{ height: "25px", width: "25px", marginRight: "10px" }} />  logout</Button>
                  </MenuItem>

                </MenuList>
              </MenuPopover>
            </Menu>
          </Body1>
        }

      />

    </div>
  );
};

export default Navbar;