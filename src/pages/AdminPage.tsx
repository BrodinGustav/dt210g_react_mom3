import { useAuth } from "../context/AuthContext";

const AboutPage = () => {

    const {user} = useAuth();

    return (
        <div>
            <h1>Välkommen {user ? user.firstName : ""}</h1>
        </div>
    )
}

export default AboutPage