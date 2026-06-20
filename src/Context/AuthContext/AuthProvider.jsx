import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "./AuthContext";
import { auth } from "../../firebase/firebase.init";

const AuthProvider = ({children}) => {

    // to create user with email and pass
    const registerUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // to sing in user with email and pass
    const signInUser = (email, password)=> {
        return signInWithEmailAndPassword(auth, email ,password)
    }

    // this is for all values
    const authInfo = {
        registerUser,
        signInUser
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;