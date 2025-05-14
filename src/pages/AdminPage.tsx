import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchPost } from "../context/PublicContext";
import { BloggPost } from "../types/public.types";
import '../../src/App.css'
import { Link } from 'react-router-dom';
import Loader from "../components/Loader";
import { formatDate } from "../utils/formateDate";
import Header from "../components/Header";

const AdminPage = () => {

    const { createPost, updatePost, deletePost, user } = useAuth();


    //Hämtar blogginlägg från server
    const [posts, setPosts] = useState<BloggPost[]>([]);        //Lagrar data med useState
     const [loading, setLoading] = useState(true);              //Laddar vid hämtning av data

    //State för att lagra inputvärden
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        postId: "",
        updateTitle: "",
        updateDescription: "",
        postDeleteId: ""
    });

    //För att lagra felmeddelanden
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        postId: "",
        updateTitle: "",
        updateDescription: "",
        postDeleteId: ""
    });

    const [successMessage, setSuccessMessage] = useState("");


    //Laddar in data från backend vid start av sida med useEffect
    useEffect(() => {
        getPosts();
    }, []);


    //Deklararerar getPosts utanför useEffect för att kunna anropa den efter varje CRUD (för att uppdatera lista på fronten)
    const getPosts = async () => {
         setLoading(true);
     
         try {
        const data = await fetchPost();
        setPosts(data);
     
    } catch (error) {
        console.error("Fel vid hämtning:", error);
    
    } finally {
        setLoading(false); 
    }
    };

    //Hanterar alla inputfält via name-attributet
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    //Tar de första fyra tecknen från ID:t (används som förenklat ID i gränssnittet)
    const generateShortId = (id: string) => id.slice(0, 4);


    //Skapa inlägg
    const handleCreatePost = async () => {

        let valid = true;
        let newErrors = { ...errors };


        if (!formData.title) {
            newErrors.title = "Titel är obligatorisk";
            valid = false;
        }

        if (!formData.description) {
            newErrors.description = "Beskrivning är obligatorisk";
            valid = false;
        }


        setErrors(newErrors);

        if (valid) {
            try {
                const newPost = await createPost({ title: formData.title, description: formData.description });
                console.log("Inlägg skapat:", newPost);
                getPosts();
                setFormData(prev => ({ ...prev, title: "", description: "" }));
                setSuccessMessage("Inlägget har skapats!");
                setLoading(false);
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
  if (!formData.postId) {
            newErrors.postId = "Inläggs-ID är obligatoriskt";
            valid = false;
        }

      if (!formData.updateTitle) {
            newErrors.updateTitle = "Titel är obligatorisk";
            valid = false;
        }

        if (!formData.updateDescription) {
            newErrors.updateDescription = "Beskrivning är obligatorisk";
            valid = false;
        }


    setErrors(newErrors);
  if (valid) {
            const postToUpdate = posts.find(post => generateShortId(post._id) === formData.postId);
            if (!postToUpdate) {
             setErrors(prev => ({ ...prev, postId: "Inget inlägg hittades med detta ID" }));
                return;
            }

            try {
                const updatedPost = await updatePost(postToUpdate._id, {
                    title: formData.updateTitle,
                    description: formData.updateDescription
                });
                console.log("Inlägg uppdaterat:", updatedPost);
                setSuccessMessage("Inlägget har uppdaterats!");
                getPosts();
                setFormData(prev => ({
                    ...prev,
                    postId: "",
                    updateTitle: "",
                    updateDescription: ""
                }));
            } catch (error) {
                console.error("Fel vid uppdatering av inlägg:", error);
            }
        }
    };

//Radera inlägg
const handleDeletePost = async () => {

    let valid = true;
    let newErrors = { ...errors };

    if (!formData.postDeleteId) {
            newErrors.postDeleteId = "Inläggs-ID är obligatoriskt";
            valid = false;
        }

    setErrors(newErrors);

     if (valid) {
            const postToDelete = posts.find(post => generateShortId(post._id) === formData.postDeleteId);
            if (!postToDelete) {
               setErrors(prev => ({ ...prev, postDeleteId: "Inget inlägg hittades med detta ID" }));
                return;
            }
   try {
                const deletedPost = await deletePost(postToDelete._id);
                console.log("Inlägg raderat:", deletedPost);
                setSuccessMessage("Inlägget har raderats!");
                getPosts();
                setFormData(prev => ({ ...prev, postDeleteId: "" }));
            } catch (error) {
                console.error("Fel vid radering av inlägg:", error);
            }
        }
    };



    if (loading) {
    return <Loader />;
}


return (
    <>

        <h1>Adminpanel</h1>
        <h2>Välkommen {user ? user.firstName : "Admin"}</h2>

    <div className="formWrapper">
        <div>
             {successMessage && <p className="success">{successMessage}</p>}
            <h3>Skapa inlägg</h3>
            <input type="text"  name="title" placeholder="Titel" value={formData.title}  onChange={handleChange}/>
            {errors.title && <p className="error">{errors.title}</p>}

            <textarea name="description" placeholder="Beskrivning" value={formData.description} onChange={handleChange} />

            {errors.description && <p className="error">{errors.description}</p>}
            
            <button onClick={handleCreatePost}>Skapa</button>

        </div>


  {/* Uppdatera inlägg */}
        <div>
            <h3>Uppdatera inlägg</h3>
            <input type="text" name="postId" placeholder="Inläggs-ID" value={formData.postId} onChange={handleChange} />

            {errors.postId && <p className="error">{errors.postId}</p>}

            <input type="text" name="updateTitle" placeholder="Ny titel" value={formData.updateTitle} onChange={handleChange} />

            {errors.updateTitle && <p className="error">{errors.updateTitle}</p>}

            <textarea name="updateDescription" placeholder="Ny beskrivning" value={formData.updateDescription} onChange={handleChange}/>

            {errors.updateDescription && <p className="error">{errors.updateDescription}</p>}

            <button onClick={handleUpdatePost}>Uppdatera</button>
        </div>

        <div>
            <h3>Radera inlägg</h3>
            <input type="text" name="postDeleteId" placeholder="Inläggs-ID" value={formData.postDeleteId} onChange={handleChange} />

            {errors.postDeleteId && <p className="error">{errors.postDeleteId}</p>}

            <button onClick={handleDeletePost}>Radera</button>
        </div>
        </div>

        <div>
            <h3>Blogginlägg</h3>

        <div className="bloggPostWrapper">
            <ul>
                {posts.map((post) => (
                    <li key={post._id}>
                        <h3>Title: {post.title}</h3>
                        <p>ID: {generateShortId(post._id)}</p>
                        <p>{post.description}</p>
                        <p><strong>Författare:</strong> {post.author?.firstName || "Okänd"}</p>
                        <p>Skapad: {formatDate(post.createdAt)}</p>
                        <Link to={`/blogg/${post._id}`}>
                            <button>Visa detaljer</button>
                        </Link>
                    </li>
                ))}
            </ul>
            </div>
        </div>

    </>
);
    };



export default AdminPage