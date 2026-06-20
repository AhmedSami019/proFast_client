import { Outlet } from "react-router";
import Logo from "../../Components/Logo/Logo";
import authImg from "../../assets/authImage.png"

const AuthLayouts = () => {
    return (
        <div className="w-11/12 mx-auto mt-10 space-y-10">
            <Logo/>
            <div className="flex">

            <div className="flex-1">
                <Outlet></Outlet>
            </div>
            <div className="flex-1">
                <img className="mx-auto" src={authImg} alt="" />
            </div>
            </div>
        </div>
    );
};

export default AuthLayouts;