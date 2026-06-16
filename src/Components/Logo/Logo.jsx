import logo from "../../assets/logo.png"

const Logo = () => {
    return (
        <div className="flex items-end ">
            <img className=" h-10" src={logo} alt="" />
            <h3 className="text-2xl font-extrabold -ml-3 -mb-1">ProFast</h3>
        </div>
    );
};

export default Logo;