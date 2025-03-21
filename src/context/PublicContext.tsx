import { BloggPost } from "../types/public.types";

//Hämta poster
export const fetchPost = async () => {

    try {
        const res = await fetch("http://localhost:5000/api/blogg/", {
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

}


