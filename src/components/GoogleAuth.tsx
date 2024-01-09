import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import createSheet from '../process/GoogleSheetsProcess';

const CLIENT_ID: any = process.env.REACT_APP_GOOGLE_CLIENT_ID;
const buttonName: string = "Login with Google";

interface GoogleAuthProps {
    onLogin: any;
}

const GoogleAuth = (props: GoogleAuthProps) => {
    const handleGoogleLogin = async (response: any) => {
        if (response?.tokenId) {
            // Authenticate Google Sheets API and get the sheet ID
            const sheets = await createSheet(response.tokenId);

            // Pass the sheet ID or other relevant data to the parent component
            props.onLogin({ tokenId: response.tokenId, sheets });
        }
    };


    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <GoogleLogin text="signin" onSuccess={handleGoogleLogin} />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
