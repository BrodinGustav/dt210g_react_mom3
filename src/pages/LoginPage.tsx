import React from 'react'
import { useState } from 'react';

const LoginPage = () => {

    //States för inputfält och error
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    //Nollställer error-state och förhindrar sidan från att laddas om
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

    };


    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Logga in</h2>

            </div>

                //Formulär med eventlyssnare
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}  //Eventlyssnare som ändrar state för inputfält vid uppdatering
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Lösenord</label>
                    <input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} //Eventlyssnare som ändrar state för inputfält vid uppdatering
                    />
                    </div>

                    <button
                    type="submit"
                >
                    Logga in
                    </button>
                    </form>    
                    </div>
                    
                )
            }
        


                export default LoginPage 