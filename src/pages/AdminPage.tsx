import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchPost } from "../context/PublicContext";
import { BloggPost } from "../types/public.types";

const AdminPage = () => {

    const { createPost, updatePost, deletePost, user } = useAuth();


    //Hämtar blogginlägg från server
    const [posts, setPosts] = useState<BloggPost[]>([]);        //Lagrar data med useState


    //Deklararerar getPosts utanför useEffect för att kunna anropa den efter varje CRUD (för att uppdatera lista på fronten)
    const getPosts = async () => {
        const data = await fetchPost();
        setPosts(data);
    };

    //Laddar in data från backend vid start av sida med useEffect
    useEffect(() => {
        getPosts();
    }, []);


    //State för att lagra inputvärden
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [postId, setPostId] = useState("");

    //State för att lagra uppdaterade inputvärden
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");

    //State för att lagra delete inputvärde (id)
    const [postDeleteId, setPostDeleteId] = useState("");


    //Skapa inlägg
    const handleCreatePost = async () => {
        try {
            const newPost = await createPost({ title, description });
            console.log("Inlägg skapat:", newPost);

            //Uppdatera listan
            getPosts();

        } catch (error) {
            console.error("Fel vid skapande av inlägg:", error);
        }
    };

    //Uppdatera inlägg
    const handleUpdatePost = async () => {
        try {
            //Hitta fullständiga ID:t baserat på det kortare ID:t (från inputfältet)
            const postToUpdate = posts.find(post => generateShortId(post._id) === postId);

            if (!postToUpdate) {
                console.error("Inget inlägg hittades med detta ID");
                return;
            }

                 //Skickar fullständifr ID med PUT
            const updatedPost = await updatePost(postToUpdate._id, { title, description });
            console.log("Inlägg uppdaterat:", updatedPost);

            //Uppdatera listan
            getPosts();

        } catch (error) {
            console.error("Fel vid uppdatering av inlägg:", error);
        }
    };

    //Radera inlägg
    const handleDeletePost = async () => {
        try {
            await deletePost(postId);
            console.log("Inlägg raderat:", postId);
        } catch (error) {
            console.error("Fel vid radering av inlägg:", error);
        }
    };


    //Metod för att generera unikt, ensiffrigt ID
    const generateShortId = (id: string) => id.slice(0, 4);  //Skriver ut de först 2 tecken från backend-ID




    return (
        <>
            <h1>Adminpanel</h1>
            <h2>Välkommen {user ? user.firstName : "Admin"}</h2>

     
            <div>
                <h3>Skapa inlägg</h3>
                <input type="text" placeholder="Titel" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Beskrivning" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={handleCreatePost}>Skapa</button>
            </div>

            <div>
                <h3>Uppdatera inlägg</h3>
                <input type="text" placeholder="Inläggs-ID" value={postId} onChange={(e) => setPostId(e.target.value)} />
                <input type="text" placeholder="Ny titel" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
                <textarea placeholder="Ny beskrivning" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                <button onClick={handleUpdatePost}>Uppdatera</button>
            </div>

            <div>
                <h3>Radera inlägg</h3>
                <input type="text" placeholder="Inläggs-ID" value={postDeleteId} onChange={(e) => setPostDeleteId(e.target.value)} />
                <button onClick={handleDeletePost}>Radera</button>
            </div>

            <div>
                <h3>Blogginlägg</h3>

                <ul>
                    {posts.map((post) => (
                        <li key={post._id}>
                            <h3>{post.title}</h3>
                            <p>ID: {generateShortId(post._id)}</p>
                            <p>{post.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    );
};


export default AdminPage