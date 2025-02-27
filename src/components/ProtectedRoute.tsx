//Komponent som kontrollerar om användare är auktoriserad. Skickar annars till annan undersida.

import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace /> //Replace skickar användare till login om inte inloggad
    }

    //Om inlogg returnera komponenterna
    return (
        <>

            {children}

        </>
    )

}

export default ProtectedRoute 