// LoginPage.js
import React, { useEffect } from 'react';
import { usePage } from '../../contexts/PageContext';
import GoogleAuth from '../../components/GoogleAuth';
import { Settings24Filled, Delete24Filled } from "@fluentui/react-icons";
import { Button, Input, Label } from '@fluentui/react-components';
import Modal from '../../components/Modal';

const LoginPage = () => {
  const page = usePage();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [config, setConfig] = React.useState<any>(null);

  const handleConfigChange = (e: any, id: string) => {
    setConfig((prevConfig: any) => ({
      ...prevConfig,
      [id]: e.target.value
    }));
  };


  const handleConfigSubmit = () => {
    localStorage.setItem("userConfig", JSON.stringify(config));
    window.location.reload();
    setIsOpen(false);
  }


  useEffect(() => {
    page.setPageName("Login");

  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <img src="logo192.png" style={{ margin: "200px", marginBottom: "5px" }} alt="Login Page" />
      <h1 style={{ marginBottom: "100px" }}>run to the hills</h1>
      <GoogleAuth />

      <iframe style={{ borderRadius: "12px", marginTop: "50px" }} src="https://open.spotify.com/embed/track/4Zc7TCHzuNwL0AFBlyLdyr?utm_source=generator&theme=0" width="25%" height="152" frameBorder="0" allowFullScreen={true} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      <Modal
        button={<Button style={{ marginTop: "20px", border: "none" }} icon={<Settings24Filled />} content="settings" onClick={() => setIsOpen(true)} />}
        dialogTitle={"settings"}
        handleSubmit={() => handleConfigSubmit()}
        isOpen={isOpen}
        setIsOpen={() => { setIsOpen(false); }}
        dialogBody={<>
          <Label required htmlFor={"firebase-config-input"}>
            firebase config info
          </Label>
          <Input required type="text" id={"apiKey"} placeholder='apiKey' onChange={(e: any) => handleConfigChange(e, "apiKey")} />
          <Input required type="text" id={"authDomain"} placeholder='authDomain' onChange={(e: any) => handleConfigChange(e, "authDomain")} />
          <Input required type="text" id={"projectId"} placeholder='projectId' onChange={(e: any) => handleConfigChange(e, "projectId")} />
          <Input required type="text" id={"storageBucket"} placeholder='storageBucket' onChange={(e: any) => handleConfigChange(e, "storageBucket")} />
          <Input required type="text" id={"messagingSenderId"} placeholder='messagingSenderId' onChange={(e: any) => handleConfigChange(e, "messagingSenderId")} />
          <Input required type="text" id={"appId"} placeholder='appId' onChange={(e: any) => handleConfigChange(e, "appId")} />
          <Input required type="text" id={"measurementId"} placeholder='measurementId' onChange={(e: any) => handleConfigChange(e, "measurementId")} />
          <Button style={{ marginTop: "50px", border: "none" }} icon={<Delete24Filled />} content="settings" onClick={() => { localStorage.removeItem("userConfig"); window.location.reload(); }} />
        </>} />
    </div >
  );
};

export default LoginPage;
