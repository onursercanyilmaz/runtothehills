// GoogleAuth.tsx

import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import CButton from './CButton';
import { auth, provider } from '../constants/firebaseConfig';
import { ArrowEnter16Filled } from "@fluentui/react-icons";
import { useNavigate } from 'react-router-dom';
import { addDataToSheet, getUserData } from '../process/GoogleSheetsProcess';
import { v4 as uuidv4 } from 'uuid';


const CLIENT_ID: any = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const buttonName: string = "login with google";

interface GoogleAuthProps { }

const GoogleAuth = (props: GoogleAuthProps) => {
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem("user", JSON.stringify(result.user));
            // navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const isUserAuthenticated = () => {
        const userString = localStorage.getItem('user');
        return !!userString;
    };


    const handleAddNewItem = async () => {
        const user = JSON.parse(localStorage.getItem("user")!);
        const data = {
            id: uuidv4(),
            pathid: "2",
            pathname: "2",
            platformname: "3",
            itemname: "4",
            itemlink: "5",
            progress: "66"
        };
        addDataToSheet(user.uid, data);
        getUserData(user.uid)
    };
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CButton
                style={{ width: '200px', height: "50px" }}
                buttonName={buttonName}
                onClick={handleLogin}
                icon={<ArrowEnter16Filled />}
            />

            <button onClick={handleAddNewItem}>Ekle</button>
        </div>
    );
};

export default GoogleAuth;

