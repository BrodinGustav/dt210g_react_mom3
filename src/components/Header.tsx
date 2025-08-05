import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import "../styles/Header.css";

const Header = () => {

    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="logo">
                <NavLink to="/">
                    <img src="/blogger-brands.svg" alt="Logotyp" className="logo-img" />
                </NavLink>
            </div>


            {/* Meny-knapp för mobil */}
            <input type="checkbox" id="menu-toggle" className="menu-toggle" />
            <label htmlFor="menu-toggle" className="menu-icon">
                <span className="open">&#9776;</span> {/* ☰ */}
                <span className="close">&times;</span> {/* ✖ */}
            </label>

            <nav className="nav-menu">
                <ul>
                    <li><NavLink to="/">Startsida</NavLink></li>
                    <li>
                        {
                            !user ? <NavLink to="/login">Logga in</NavLink> : <button className="logoutBtn" onClick={logout}>Logga ut</button>
                        }
                    </li>
                    {user && (
                        <li>
                            <NavLink to="/admin">Admin</NavLink>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};


export default Header