import { NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import logoNav from '../assets/logoNav.jpg'
import style from './NavBar.module.css'

export const NavBar = () => {
    const location = useLocation();
    
    return (
        <div className={style.navCont}>
            <img src={logoNav} alt="logo" />
            <div className={style.navLink}> 
                <NavLink className={`${style.navLink} ${location.pathname === '/home'    ? style.active : ''}`} to={'/home'}>Home</NavLink>
                <NavLink className={`${style.navLink} ${location.pathname === '/shop'    ? style.active : ''}`} to={'/shop'}>Shop</NavLink>
                <NavLink className={`${style.navLink} ${location.pathname === '/about'   ? style.active : ''}`} to={'/about'}>About</NavLink>
                <NavLink className={`${style.navLink} ${location.pathname === '/contact' ? style.active : ''}`} to={'/contact'}>Contact</NavLink>
            </div>
            <div className={style.buttonCont}>
                <button className={style.buttonLog}>Log In</button>
                <button className={style.buttonSign}>Sign Up</button>
            </div>
        </div>
    )
}
