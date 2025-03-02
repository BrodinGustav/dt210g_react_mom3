import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {

    const { createPost, updatePost, deletePost, user } = useAuth();

    // State för att lagra inputvärden
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [postId, setPostId] = useState("");

    // Skapa inlägg
    const handleCreatePost = async () => {
        try {
            const newPost = await createPost({ title, description });
            console.log("Inlägg skapat:", newPost);
        } catch (error) {
            console.error("Fel vid skapande av inlägg:", error);
        }
    };

    // Uppdatera inlägg
    const handleUpdatePost = async () => {
        try {
            const updatedPost = await updatePost(postId, { title, description });
            console.log("Inlägg uppdaterat:", updatedPost);
        } catch (error) {
            console.error("Fel vid uppdatering av inlägg:", error);
        }
    };

    // Radera inlägg
    const handleDeletePost = async () => {
        try {
            await deletePost(postId);
            console.log("Inlägg raderat:", postId);
        } catch (error) {
            console.error("Fel vid radering av inlägg:", error);
        }
    };


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
                <input type="text" placeholder="Ny titel" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Ny beskrivning" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button onClick={handleUpdatePost}>Uppdatera</button>
            </div>

            <div>
                <h3>Radera inlägg</h3>
                <input type="text" placeholder="Inläggs-ID" value={postId} onChange={(e) => setPostId(e.target.value)} />
                <button onClick={handleDeletePost}>Radera</button>
            </div>

        </>
    );
};


export default AdminPage