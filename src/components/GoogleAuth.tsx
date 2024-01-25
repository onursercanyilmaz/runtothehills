// GoogleAuth.tsx

import React from 'react';
import CButton from './CButton';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { handleLogin } from '../constants/LoginProcess';


const buttonName: string = "login with google";
interface GoogleAuthProps { }



const GoogleAuth = (props: GoogleAuthProps) => {
    const navigate = useNavigate();



    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CButton
                style={{ width: '200px', height: "50px" }}
                buttonName={buttonName}
                onClick={() => handleLogin(navigate)}
                icon={<img src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" width={25} alt="Add Folder" />}
            />

        </div>
    );
};

export default GoogleAuth;

