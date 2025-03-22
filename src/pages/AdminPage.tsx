import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchPost } from "../context/PublicContext";
import { BloggPost } from "../types/public.types";
import '../app.css'
import { Link } from 'react-router-dom';

const AdminPage = () => {

    const { createPost, updatePost, deletePost, user } = useAuth();


    //Hämtar blogginlägg från server
    const [posts, setPosts] = useState<BloggPost[]>([]);        //Lagrar data med useState


    //State för att lagra inputvärden
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [postId, setPostId] = useState("");

    //State för att lagra uppdaterade inputvärden
    const [updateTitle, setUpdateTitle] = useState("");
    const [updateDescription, setUpdateDescription] = useState("");

    //State för att lagra delete inputvärde (id)
    const [postDeleteId, setPostDeleteId] = useState("");

    //För att lagra felmeddelanden
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        postId: "",
        updateTitle: "",
        updateDescription: "",
        postDeleteId: ""
    });


    //Deklararerar getPosts utanför useEffect för att kunna anropa den efter varje CRUD (för att uppdatera lista på fronten)
    const getPosts = async () => {
        const data = await fetchPost();
        setPosts(data);
    };



    //Laddar in data från backend vid start av sida med useEffect
    useEffect(() => {
        getPosts();
    }, []);


    //Skapa inlägg
    const handleCreatePost = async () => {

        let valid = true;
        let newErrors = { ...errors };


        //Validera titel och beskrivning
        if (!title) {
            newErrors.title = "Titel är obligatorisk";
            valid = false;
        } else {
            newErrors.title = "";
        }

        if (!description) {
            newErrors.description = "Beskrivning är obligatorisk";
            valid = false;
        } else {
            newErrors.description = "";
        }

        //Uppdaterar felmeddelanden
        setErrors(newErrors);

        if (valid) {
            try {

                const newPost = await createPost({ title, description });
                console.log("Inlägg skapat:", newPost);

                //Uppdatera listan
                getPosts();

            } catch (error) {
                console.error("Fel vid skapande av inlägg:", error);
            }

        }
    };


    //Uppdatera inlägg
    const handleUpdatePost = async () => {

        let valid = true;
        let newErrors = { ...errors };


        //Validera titel och beskrivning
        if (!updateTitle) {
            newErrors.updateTitle = "Titel är obligatorisk";
            valid = false;
        } else {
            newErrors.updateTitle = "";
        }

        if (!updateDescription) {
            newErrors.updateDescription = "Beskrivning är obligatorisk";
            valid = false;
        } else {
            newErrors.updateDescription = "";
        }

        if (!postId) {
            newErrors.postId = "Inläggs-ID är obligatoriskt";
            valid = false;
        } else {
            newErrors.postId = "";
        }

        setErrors(newErrors);

        if (valid) {

            //Hitta fullständiga ID:t baserat på det kortare ID:t (från inputfältet)
            const postToUpdate = posts.find(post => generateShortId(post._id) === postId);

            if (!postToUpdate) {
                console.error("Inget inlägg hittades med detta ID");
                return;
            }


            //debugg
            console.log("Data som skickas i PUT:", { title: updateTitle, description: updateDescription });

            try {

                //Skickar fullständifr ID med PUT
                const updatedPost = await updatePost(postToUpdate._id, { title: updateTitle, description: updateDescription });
                console.log("Inlägg uppdaterat:", updatedPost);


                //Uppdatera listan
                getPosts();

            } catch (error) {
                console.error("Fel vid uppdatering av inlägg:", error);
            }
        }

    };

    //Radera inlägg
    const handleDeletePost = async () => {

        let valid = true;
        let newErrors = { ...errors };

        if (!postDeleteId) {
            newErrors.postDeleteId = "Inläggs-ID är obligatoriskt";
            valid = false;
        } else {
            newErrors.postDeleteId = "";
        }

        setErrors(newErrors);

        if (valid) {

                console.log("Alla inläggs-ID:", posts.map(post => post._id));
                console.log("Alla korta ID:", posts.map(post => generateShortId(post._id)));
                console.log("ID som letas efter:", postDeleteId);


                //Hitta fullständiga ID:t baserat på det kortare ID:t (från inputfältet)
                const postToDelete = posts.find(post => generateShortId(post._id) === postDeleteId);

                if (!postToDelete) {
                    console.error("Inlägg ej hittat, kan ej radera.");
                    return;
                }


                //debugg
                console.log("ID som skickas för radering:", postToDelete);

                try {

                //Skickar fullständifr ID med PUT
                const deletedPost = await deletePost(postToDelete._id);
                console.log("Inlägg uppdaterat:", deletedPost);

                //Uppdatera listan
                getPosts();

                //debugg
                console.log("Inlägg raderat:", postDeleteId);
            } catch (error) {
                console.error("Fel vid radering av inlägg:", error);
            }
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
                    {errors.title && <p className="error">{errors.title}</p>}

                    <textarea placeholder="Beskrivning" value={description} onChange={(e) => setDescription(e.target.value)} />
                    {errors.description && <p className="error">{errors.description}</p>}
                    <button onClick={handleCreatePost}>Skapa</button>

                </div>

                <div>
                    <h3>Uppdatera inlägg</h3>
                    <input type="text" placeholder="Inläggs-ID" value={postId} onChange={(e) => setPostId(e.target.value)} />

                    {errors.postId && <p className="error">{errors.postId}</p>}

                    <input type="text" placeholder="Ny titel" value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />

                    {errors.updateTitle && <p className="error">{errors.updateTitle}</p>}

                    <textarea placeholder="Ny beskrivning" value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />

                    {errors.updateDescription && <p className="error">{errors.updateDescription}</p>}

                    <button onClick={handleUpdatePost}>Uppdatera</button>
                </div>

                <div>
                    <h3>Radera inlägg</h3>
                    <input type="text" placeholder="Inläggs-ID" value={postDeleteId} onChange={(e) => setPostDeleteId(e.target.value)} />

                    {errors.postDeleteId && <p className="error">{errors.postDeleteId}</p>}

                    <button onClick={handleDeletePost}>Radera</button>

                </div>

                <div>
                    <h3>Blogginlägg</h3>

                    <ul>
                        {posts.map((post) => (
                            <li key={post._id}>
                                <h3>Title: {post.title}</h3>
                                <p>ID: {generateShortId(post._id)}</p>
                                <p>{post.description}</p>
                                <p><strong>Författare:</strong> {post.author?.firstName || "Okänd"}</p>
                                <p>Skapad: {post.createdAt}</p>
                                <Link to={`/blogg/${post._id}`}>
                                    <button>Visa detaljer</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

            </>
        );
    };



    export default AdminPage