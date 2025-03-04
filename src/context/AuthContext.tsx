import { createContext, useState, useContext, ReactNode, useEffect } from "react";;
import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

//Skapa context
const AuthContext = createContext<AuthContextType | null>(null);


interface AuthProviderProps {
    children: ReactNode
}

//Provider (lagrar vad contexten innehåller. Lagrar också vad som ska skickas ut till komponenter som använder context-filen)
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {    //Returnerar en React FC, tar emot children som är React Nodes

    //State för användare
    const [user, setUser] = useState<User | null>(null);    //Använder interface User

    console.log("Current user:", user);



    //Inlogg
    const login = async (credentials: LoginCredentials) => {

        console.log("Current user:", user);

        try {
            const res = await fetch("http://localhost:5000/api/auth/login/", {  //Om ok inlogg genereras token som skickas till klienten
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

            console.log("User:", data.user);
            console.log("Token:", data.token);

            //Lagra info om användare 
            setUser(data.user);

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

            const res = await fetch("http://localhost:5000/api/auth/validate", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token
                }
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            }
        } catch (error) {
            console.error("Fel vid tokenvalidering:", error);
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    useEffect(() => {
        checkToken();
    }, [])

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


//Skapa blogginlägg
const createPost = async (postData: { title: string, description: string }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }

    const response = await fetch("http://localhost:5000/api/Blogg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer $(token)`
        },
        body: JSON.stringify(postData)
    });
    if (!response.ok) {
        throw new Error("Fel vid skapande av inlägg.");
    }

    return response.json();
};



//Hämta blogginlägg


//Uppdatera blogginlägg
const updatePost = async (postId: string, updatedData: { title?: string; description?: string }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }

    const response = await fetch(`http://localhost:5000/api/Blogg/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer $(token)`
        },
        body: JSON.stringify(updatedData)
    });
    if (!response.ok) {
        throw new Error("Fel vid uppdatering av inlägg.");
    }

    return response.json();
};


//Radera blogginlägg
const deletePost = async (postId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }

    const response = await fetch(`http://localhost:5000/api/Blogg/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer $(token)`
        },
    });
    if (!response.ok) {
        throw new Error("Fel vid radering av inlägg.");
    }

    return response.json();
};



