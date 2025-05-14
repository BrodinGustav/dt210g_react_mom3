
//Skapa blogginlägg
export const createPost = async (postData: { title: string, description: string}) => { 
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }

    const response = await fetch("http://localhost:5000/api/blogg/",
        {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });

    /*
    const response = await fetch("https://dt210g-mom3-backend-1.onrender.com/api/blogg", {  BYT TILLBAKA NÄR KLAR
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });
   */

    if (!response.ok) {
        throw new Error("Fel vid skapande av inlägg.");
    }

    return response.json();
};


//Radera blogginlägg
export const deletePost = async (postId: string) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }

    const response = await fetch(`http://localhost:5000/api/blogg/${postId}`, {
            method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });

    /*
    const response = await fetch(`https://dt210g-mom3-backend-1.onrender.com/api/blogg/${postId}`, {    BYT TILLBAKA NÄR KLAR
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    */

    if (!response.ok) {
        throw new Error("Fel vid radering av inlägg.");
    }

    return response.json();
};

//Uppdatera blogginlägg
export const updatePost = async (id: string, updatedPostData: { title?: string; description?: string }) => {

    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }


     const response = await fetch(`http://localhost:5000/api/blogg/${id}`, {
            method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
         body: JSON.stringify(updatedPostData)
    });

    /*
    const response = await fetch(`https://dt210g-mom3-backend-1.onrender.com/api/blogg/${id}`, {    BYT TILLBAKA NÄR KLAR
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedPostData)
    });
*/

    if (!response.ok) {
        throw new Error("Fel vid uppdatering av inlägg.");
    }

    return response.json();
};


