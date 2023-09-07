import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { MdFavorite, MdOutlineAdminPanelSettings } from "react-icons/md";
import { PiUserCircleFill } from "react-icons/pi";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import logoNav from "../../assets/logo_greenland.png";
import style from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/action";
import { useSpring, animated } from "@react-spring/web";

export const NavBar = () => {
  const location = useLocation();
  const auth = useSelector((state) => state.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showUserMenu, setshowUserMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [fix, setFix] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  function setFixed() {
    if (window.scrollY >= 150) {
      setFix(true);
    } else {
      setFix(false);
    }
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleUserMenu = () => {
    setshowUserMenu(!showUserMenu);

    api.start({
      opacity: showUserMenu ? 0 : 1,
      config: { duration: 800 },
      onRest: () => {},
    });
  };

  window.addEventListener("scroll", setFixed);

  const [springs, api] = useSpring(() => ({
    from: { opacity: showUserMenu ? 1 : 0 },
  }));

  const navLinks = [
    { to: "/home", text: "Home" },
    { to: "/shop", text: "Shop" },
    { to: "/about", text: "About" },
    { to: "/contact", text: "Contact" },
  ];

  return (
    <nav className={`${style.navCont} ${fix ? style.navContFix : ""}`}>
      <img src={logoNav} alt="logo" />
      <div className={`${showMenu ? style.navLinkRespon : style.navLinkCont}`}>
        {showMenu &&
          (!auth ? (
            <div className={style.containerLog}>
              <NavLink
                to={"/login"}
                className={`${fix ? style.buttonLogFix : style.buttonLog}`}
              >
                Log In
              </NavLink>
              <NavLink to={"/signup"} className={style.buttonSign}>
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className={style.containerLog}>
              <button
                onClick={handleLogout}
                className={`${fix ? style.buttonLogFix : style.buttonLog}  ${
                  style.buttonLogout
                }`}
              >
                Log Out
              </button>
            </div>
          ))}
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            className={`${style.navLink} ${fix ? style.navLinkFix : ""} ${
              location.pathname === link.to && fix ? style.activeFix : ""
            } ${location.pathname === link.to ? style.active : ""}`}
            to={link.to}
          >
            {link.text}
          </NavLink>
        ))}
        <div className={`${style.profileOptOpen} ${style.profileIcons}`}>
          {auth && (
            <NavLink to={"/profile"} onClick={handleUserMenu}>
              <FaUserCircle />
            </NavLink>
          )}
          {auth?.roleId === 1 && (
            <>
              <NavLink to={"/dashboard"} onClick={handleUserMenu}>
                <MdOutlineAdminPanelSettings />
              </NavLink>
            </>
          )}
        </div>
      </div>
      <div className={style.burguerMenu} onClick={toggleMenu}>
        <div
          className={`${style.burguerItem} ${
            showMenu ? style.clicked : style.unclicked
          }`}
        ></div>
        <div
          className={`${style.burguerItem} ${
            showMenu ? style.clicked : style.unclicked
          }`}
        ></div>
        <div
          className={`${style.burguerItem} ${
            showMenu ? style.clicked : style.unclicked
          }`}
        ></div>
      </div>
      <div className={style.buttonCont}>
        <NavLink
          to={"/wishlist"}
          className={`${fix ? style.buttonCartFix : style.buttonCart}`}
        >
          <MdFavorite size={28} />
        </NavLink>
        <NavLink
          to={"/cart"}
          className={`${fix ? style.buttonCartFix : style.buttonCart}`}
        >
          <FaShoppingCart size={28} />
        </NavLink>
        {!auth ? (
          <>
            <NavLink
              to={"/login"}
              className={`${fix ? style.buttonLogFix : style.buttonLog}`}
            >
              Log In
            </NavLink>
            <NavLink to={"/signup"} className={style.buttonSign}>
              Sign Up
            </NavLink>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className={`${fix ? style.buttonLogFix : style.buttonLog}`}
            >
              Log Out
            </button>
            {auth?.image !== null ? (
              <img
                src={auth.image}
                alt=""
                className={style.profileImg}
                onClick={handleUserMenu}
              />
            ) : (
              <PiUserCircleFill size={55} onClick={handleUserMenu} />
            )}
            <animated.div
              className={`${
                showUserMenu ? style.profileOptOpen : style.profileOptClose
              }`}
              style={springs}
            >
              <NavLink to={"/profile"} onClick={handleUserMenu}>
                <div>View Profile</div>
              </NavLink>
              {auth.roleId === 1 && (
                <>
                  <NavLink to={"/dashboard"} onClick={handleUserMenu}>
                    <div>Dashboard</div>
                  </NavLink>
                </>
              )}
            </animated.div>
          </>
        )}
      </div>
    </nav>
  );
};
