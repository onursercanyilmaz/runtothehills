import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../constants/firebaseConfig';
import { NavigateFunction, useNavigate } from 'react-router-dom';

export const handleLogin = async (navigate: NavigateFunction) => {
    try {
        const result = await signInWithPopup(auth, provider);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/");
    } catch (error) {
        console.log(error);
    }
};

export const handleLogout = async (navigate: NavigateFunction) => {
    try {
        await auth.signOut();
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    } catch (error) {
        console.log(error);
    }
}