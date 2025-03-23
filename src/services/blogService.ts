
//Skapa blogginlägg
export const createPost = async (postData: { title: string, description: string}) => { 
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }

    const response = await fetch("https://dt210g-mom3-backend-1.onrender.com/api/blogg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(postData)
    });
    if (!response.ok) {
        throw new Error("Fel vid skapande av inlägg.");
    }

    return response.json();
};


//Radera blogginlägg
export const deletePost = async (postId: string) => {
    const token = localStorage.getItem("token");

    //debugg
    console.log("Token vid PUT/DELETE:", token);

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }

    const response = await fetch(`https://dt210g-mom3-backend-1.onrender.com/api/blogg/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    });
    if (!response.ok) {
        throw new Error("Fel vid radering av inlägg.");
    }

    console.log("ID som skickas:", postId);
    return response.json();
};

//Uppdatera blogginlägg
export const updatePost = async (id: string, updatedPostData: { title?: string; description?: string }) => {

    const token = localStorage.getItem("token");

    //debugg
    console.log("Token vid PUT/DELETE:", token);

    if (!token) {
        throw new Error("Ingen token hittades, användaren är inte inloggad.");
    }


    const response = await fetch(`https://dt210g-mom3-backend-1.onrender.com/api/blogg/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updatedPostData)
    });
    if (!response.ok) {
        throw new Error("Fel vid uppdatering av inlägg.");
    }

    console.log("ID som skickas:", id);
    return response.json();
};


