import { Link } from "react-router";
import logo from "../../assets/logo.png"

const Logo = () => {
    return (
        <Link to={'/'} className="flex items-end ">
            <img className=" h-10" src={logo} alt="" />
            <h3 className="text-2xl font-extrabold -ml-3 -mb-1">ProFast</h3>
        </Link>
    );
};

export default Logo;