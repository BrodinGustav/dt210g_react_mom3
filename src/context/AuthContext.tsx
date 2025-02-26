import { createContext, useState, useContext, ReactNode } from "react";;
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

//Skapa context
const AuthContext = createContext <AuthContextType | null >(null);


interface AuthProviderProps {
    children: ReactNode
} 

//Provider (lagrar vad contexten innehåller. Lagrar också vad som ska skickas ut till komponenter som använder context-filen)
export const AuthProvider: React.FC<AuthProviderProps> = ( {children }) => {    //Returnerar en React FC, tar emot children som är React Nodes

    //State för användare
    const [user, setUser] = useState<User | null>(null);    //Använder interface User

    //Ajaxanrop för inlog
    const login = async (credentials: LoginCredentials) => { 

        try {
            const res = await fetch("http://localhost:5000/api/auth/login/", {  //Om ok inlogg genereras token som skickas till klienten
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })    

            if(!res.ok) throw new Error("Inloggning misslyckades.");

            //Konverterar till JS
            const data = await res.json() as AuthResponse;

            //Lagrar i localStorage
            localStorage.setItem("token", data.token);

            //Lagra info om användare 
            setUser(data.user);

        } catch(error) {
            throw error;
        }

    }

    //Logga ut-metod
    const logout = () => {
        localStorage.removeItem("token");

        setUser(null);
    }

    //Koppla ihop AuthContext med AuthProvider och returnera tillbaka
    return (
        <AuthContext.Provider value= {{user, login, logout}}>

            {/*Rendera komponenten som använder providen*/}
            {children}

        </AuthContext.Provider>
    )
}

export const useAuth = () : AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider");
    }

    return context;
}


Fortsättning 29.57 i https://mallarmiun.github.io/Fordjupad-frontend-utveckling/moment-3/moment3_teori#router