import { createContext, useState, useContext, ReactNode, useEffect } from "react";;
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";
import { createPost, updatePost, deletePost } from "../services/blogService";

//Skapa context
const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProviderProps {
    children: ReactNode
}

//Provider (lagrar vad contexten innehåller. Lagrar också vad som ska skickas ut till komponenter som använder context-filen)
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {    //Returnerar en React FC, tar emot children som är React Nodes

    //State för användare
    const [user, setUser] = useState<User | null>(null);    //Använder interface User
    const [token, setToken] = useState(localStorage.getItem("token") || "");


    //Uppdaterar token i localStorage vid förändring
    useEffect(() => {
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }, [token]);


    //Inlogg
    const login = async (credentials: LoginCredentials) => {



    
        try {
        //    const res = await fetch("https://dt210g-mom3-backend-1.onrender.com/api/auth/login/", {  //Om ok inlogg genereras token som skickas till klienten ÄNDRA TILLBAKA 

            const res = await fetch("http://localhost:5000/api/auth/login", {  //Om ok inlogg genereras token som skickas till klienten
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })

            if (!res.ok) throw new Error("Inloggning misslyckades.");

            //Konverterar till JS
            const data = await res.json() as AuthResponse;

            //Lagrar i localStorage
            localStorage.setItem("token", data.token);

            //Lagra info om användare 
            setUser(data.user);
            setToken(data.token);

        } catch (error) {
            throw error;
        }

    }

    //Logga ut-metod
    const logout = () => {
        localStorage.removeItem("token");

        setUser(null);
    }


    //Validera token
    const checkToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }

        try {

         //   const res = await fetch("https://dt210g-mom3-backend-1.onrender.com/api/validate", { FIXA TILLBAKA

                 const res = await fetch("http://localhost:5000/api/validate", { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);

            } else {
              //  logout();
            }

        } catch (error) {
            console.error("Fel vid tokenvalidering:", error);
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    //Validerar token vid start och vid token-ändring
    useEffect(() => {
        checkToken();
    }, [token]);

    //Koppla ihop AuthContext med AuthProvider och returnera tillbaka
    return (
        <AuthContext.Provider value={{ user, login, logout, createPost, updatePost, deletePost }}>

            {/*Rendera komponenten som använder providen*/}
            {children}

        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}

