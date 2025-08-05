import { useEffect, useState } from "react";
import { fetchPost } from "../context/PublicContext";
import { BloggPost } from "../types/public.types";
import { Link } from 'react-router-dom';
import Loader from "../components/Loader";
import { formatDate } from "../utils/formateDate";
import "../styles/HomePage.css";

const HomePage = () => {

    const [posts, setPosts] = useState<BloggPost[]>([]);        //Lagrar data med useState
    const [loading, setLoading] = useState(true);              //Laddar vid hämtning av data


    useEffect(() => {                                           //Laddar in data från backend vid start av sida med useEffect
        const getPosts = async () => {
             setLoading(true);

             try
             {
            const data = await fetchPost();
            setPosts(data);
            
        }catch(error) {
        console.error("Fel vid hämtning:", error);
    
    } finally {
        setLoading(false); 
    }
        };

        getPosts();
    }, []);


  if (loading) {
    return <Loader />;
}
    return (
        <div>
            <h1>Välkommen till bloggen!</h1>
            <h2>Senaste inläggen</h2>

            <ul>
                {posts.map((post, index) => (
                    <li className="latestPosts" key={index}>
                        <h3>Titel: {post.title}</h3>
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
    );
};

export default HomePage