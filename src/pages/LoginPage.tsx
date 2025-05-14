import React from 'react'
import { useState, useEffect } from 'react';
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from 'react-router-dom';
import '../../src/App.css'
import '../../src/index.css'
import Loader from "../components/Loader";

const LoginPage = () => {


    //State för inmatade värden (email och lösenord)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    //State för eventuella felmeddelanden vid inloggning
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);              //Laddar vid hämtning av data



    //Tar in login-funktionen och aktuell användare från AuthContext
    const { login, user } = useAuth();

    const navigate = useNavigate();

    //Kontrollerar användare
    useEffect(() => {
        if (user) {
            navigate("/admin");
        }
    }, [])

    //Uppdaterar formData dynamiskt baserat på fältnamnet (name)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    //Hanterar formulärets inlämning
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {

            await login({ email: formData.email, password: formData.password });
            localStorage.getItem("token");

            navigate("/admin");

        } catch (error) {
            setError("Inloggninge misslyckades, kontrollera email och lösenord.");
        
         } finally {
        setLoading(false);
         }
    };



    if (loading) {
    return <Loader />;
}


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Logga in</h2>

            </div>


            <form onSubmit={handleSubmit}>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Epost</label>
                    <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Lösenord</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                >
                    Logga in
                </button>
            </form>
            <div className="link">
                <NavLink to="/">Tillbaka till startsidan</NavLink>
            </div>
        </div>

    )
}



export default LoginPage 