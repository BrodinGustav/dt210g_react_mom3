import { useEffect, useState } from "react";
import { fetchPost } from "../context/PublicContext";
import { BloggPost } from "../types/public.types";

const HomePage = () => {

    const [posts, setPosts] = useState<BloggPost[]>([]);        //Lagrar data med useState

    useEffect(() => {                                           //Laddar in data från backend vid start av sida med useEffect
        const getPosts = async () => {
            const data = await fetchPost();
            setPosts(data);
        };

        getPosts();
    }, []);



    return (
        <div>
            <h1>Välkommen till bloggen!</h1>
            <h2>Senaste inläggen</h2>

            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <h3>Titel: {post.title}</h3>
                        <p>{post.description}</p>
                        <p><strong>Författare:</strong> {post.author?.firstName || "Okänd"}</p>
                        <p>Skapad: {post.createdAt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage