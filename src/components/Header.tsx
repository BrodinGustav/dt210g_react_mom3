import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

const Header = () => {

    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/">
                    <img src="/public/blogger-brands.svg" alt="Logotyp" className="logo-img" />
                </NavLink>
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><NavLink to="/">Startsida</NavLink></li>
                    <li>
                        {
                            !user ? <NavLink to="/login">Logga in</NavLink> : <button className="logoutBtn" onClick={logout}>Logga ut</button>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    );
};


export default Header