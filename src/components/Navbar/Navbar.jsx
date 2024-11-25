import "./Navbar.css";
import { assets } from "../../assets/assets";

const Navbar = () => {
  return (
    <div className="navbar">
      <img className="logo" src={assets.logo31} alt="" />
      <img className="profileImage" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
