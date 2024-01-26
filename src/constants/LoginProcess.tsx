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
        localStorage.removeItem("user");
        localStorage.removeItem("userData");
        await auth.signOut();

        navigate("/login", { replace: true });
    } catch (error) {
        localStorage.removeItem("user");
        localStorage.removeItem("userData");
        console.log(error);
    }
}