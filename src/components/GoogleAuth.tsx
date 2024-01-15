import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import CButton from './CButton';
import { auth, provider } from '../constants/firebaseConfig';
import { ArrowEnter16Filled } from "@fluentui/react-icons";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Move the import statement here
import createSheet from '../process/GoogleSheetsProcess';

const CLIENT_ID: any = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const buttonName: string = "login with google";

interface GoogleAuthProps { }

const GoogleAuth = (props: GoogleAuthProps) => {
    const navigate = useNavigate(); // Move the declaration here

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem("user", JSON.stringify(result.user));
            createSheet();
            //navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CButton style={{ width: '200px', height: "50px" }} buttonName={buttonName} onClick={handleLogin} icon={
                <img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" width={25} alt="Add Folder" />
            }
            />
        </div>
    );
};

export default GoogleAuth;
