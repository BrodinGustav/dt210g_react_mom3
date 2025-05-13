import { useState } from "react";
import { BloggPost } from "../types/public.types";


 const [loading, setLoading] = useState(true);
 
//Hämta poster
export const fetchPost = async () => {


    try {
        
        if (loading) {
        return <p>Laddar...</p>;
    }

        const res = await fetch("https://dt210g-mom3-backend-1.onrender.com/api/blogg", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if (!res.ok) throw new Error("Kunde inte hämta inlägg.");

        //Konverterar till JS. Konverterar til array
        const data = await res.json() as BloggPost[];

        return data;

    } catch (error) {
        console.error("Fel vid hämtning av blogginlägg:", error);
        return [];
    }
     finally {
                setLoading(false);
            }

}


