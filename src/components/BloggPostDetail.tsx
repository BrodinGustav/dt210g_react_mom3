import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';           //Hämtar dynamiska parametern från URL:en, ex id
import { BloggPost } from '../types/public.types';
import { useAuth } from '../context/AuthContext';


const BlogPostDetail = () => {
    const { id } = useParams();                         //Hämtar ID från URL


    const [blogPost, setBlogPost] = useState<BloggPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {

                      const response = await fetch(`http://localhost:5000/api/blogg/${id}`);

                //Fixa tillbaka när uppgift är klar!
    /*const response = await fetch(`https://dt210g-mom3-backend-1.onrender.com/api/blogg/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Skicka token här
            'Content-Type': 'application/json',
        },
    });
*/
    if (response.ok) {
        const data: BloggPost = await response.json();

        setBlogPost(data);

    } else {
        console.error("Kunde inte hämta bloggposten", response.statusText);
    }

} catch (error) {
    console.error("Fel vid hämtning av bloggpost:", error);
} finally {
    setLoading(false);
}
        };

fetchBlogPost();
    }, [id]);

if (loading) {
    return <p>Laddar...</p>;
}

if (!blogPost) {
    return <p>Bloggposten kunde inte hittas.</p>;
}

const { user } = useAuth(); //kollar inloggad användare

return (
    <div className="bloggDetails">
        <h1>{blogPost.title}</h1>
        <p><strong>Författare:</strong> {blogPost.author ? blogPost.author.firstName : 'Okänd'}</p>
        <p>{blogPost.description}</p>
        <p><strong>Skapad:</strong> {new Date(blogPost.createdAt).toLocaleDateString()}</p>

{user && (
    <div className="linkAdmin">
        <Link to="/admin">Tillbaka till adminpanelen</Link>
    </div>
)}
    </div>
);

};

export default BlogPostDetail;